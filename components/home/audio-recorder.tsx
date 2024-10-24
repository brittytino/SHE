import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaStop, FaClock, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { Card, CardBody } from '@nextui-org/react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu2SsMedz9jYpUC2ernFPALFI8HyjcrzI",
  authDomain: "she-protect-her.firebaseapp.com",
  projectId: "she-protect-her",
  storageBucket: "she-protect-her.appspot.com",
  messagingSenderId: "595828233876",
  appId: "1:595828233876:web:a30c45747671c027d20681",
  measurementId: "G-KG4CH383K7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google Drive API configuration
const SCOPES = 'https://www.googleapis.com/auth/drive.file';
const FOLDER_ID = '1gyFdvZDbjvcg8ateiRD2AAAzESJ51yyi'; // Replace with your folder ID

const AudioRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [seconds, setSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Reference to the interval

  // Firebase Authentication
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope(SCOPES);
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  const handleSignOut = () => {
    auth.signOut();
    setFirebaseUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      setIsRecording(true);
      setSeconds(0); // Reset seconds
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone', error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      clearInterval(intervalRef.current!); // Clear the timer interval
      setIsRecording(false);
      setSeconds(0); // Reset seconds after stopping

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        audioChunksRef.current = []; // Clear the recorded chunks
        await uploadToGoogleDrive(audioBlob);
      };
    }
  };

  const uploadToGoogleDrive = async (audioBlob: Blob) => {
    if (!firebaseUser) {
      alert('Please sign in to upload to Google Drive.');
      return;
    }

    try {
      const token = await firebaseUser.getIdToken(true); // Force refresh token
      const metadata = {
        name: `recording_${Date.now()}.wav`,
        mimeType: 'audio/wav',
        parents: [FOLDER_ID],
      };

      const formData = new FormData();
      formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      formData.append('file', audioBlob);

      const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('File uploaded successfully:', data);
        alert('File uploaded successfully!');
      } else {
        const errorText = await response.text();
        console.error('Error uploading file:', errorText);
      }
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  return (
    <Card className="bg-default-50 rounded-xl shadow-md p-4">
      <CardBody className="py-5">
        <div className="flex flex-col items-center mb-4">
          <h2 className="border-dashed border-2 border-divider py-2 px-6 rounded-xl text-default-900 text-xl font-semibold">Audio Recorder</h2>
        </div>

        <div className="flex flex-col items-center gap-4">
          {!firebaseUser ? (
            <button 
              onClick={handleSignIn} 
              className="bg-blue-500 text-white py-2 px-4 rounded flex items-center hover:bg-blue-600 transition"
            >
              <FaSignInAlt className="mr-2" /> Sign In with Google
            </button>
          ) : (
            <>
              <button 
                onClick={handleSignOut} 
                className="bg-red-500 text-white py-2 px-4 rounded flex items-center hover:bg-red-600 transition"
              >
                <FaSignOutAlt className="mr-2" /> Sign Out
              </button>
              <div className="flex flex-col items-center">
                <button 
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  className={`text-white py-4 px-4 rounded ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} transition`}
                >
                  {isRecording ? (
                    <FaStop size={40} />
                  ) : (
                    <FaMicrophone size={40} />
                  )}
                </button>
                <p className="mt-2 text-center">
                  {isRecording ? 'Recording...' : 'Click to start recording'}
                </p>
                {isRecording && (
                  <div className="flex items-center mt-4">
                    <FaClock className="mr-2 text-gray-600" size={24} />
                    <span className="text-lg font-semibold">{seconds}s</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default AudioRecorder;
