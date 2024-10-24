import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaStop } from 'react-icons/fa';
import { Card, CardBody } from '@nextui-org/react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User } from 'firebase/auth';

// Firebase configuration (replace with your own configuration)
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

// Google OAuth credentials and Drive API configuration
const SCOPES = 'https://www.googleapis.com/auth/drive.file';
const FOLDER_ID = '1gyFdvZDbjvcg8ateiRD2AAAzESJ51yyi'; // Your folder ID

const AudioRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

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
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
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
    } catch (error) {
      console.error('Error accessing microphone', error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        audioChunksRef.current = []; // Clear the recorded chunks
        await uploadToGoogleDrive(audioBlob);
        setIsRecording(false);
      };
    }
  };

  const uploadToGoogleDrive = async (audioBlob: Blob) => {
    if (!firebaseUser) {
      alert('Please sign in to upload to Google Drive.');
      return;
    }

    try {
      const user = firebaseUser;
      const token = await user.getIdToken();
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
        console.error('Error uploading file:', await response.text());
      }
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  return (
    <Card className="bg-default-50 rounded-xl shadow-md p-4">
      <CardBody className="py-5">
        <div className="flex justify-center mb-4">
          <div className="border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              Audio Recorder
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          {!firebaseUser ? (
            <button 
              onClick={handleSignIn} 
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Sign In with Google
            </button>
          ) : (
            <>
              <button 
                onClick={handleSignOut} 
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Sign Out
              </button>
              <div className="flex flex-col items-center">
                <button 
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  className={`text-white py-2 px-4 rounded ${
                    isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {isRecording ? <FaStop /> : <FaMicrophone />}
                </button>
                <p className="mt-2 text-center">
                  {isRecording ? 'Recording...' : 'Click to start recording'}
                </p>
              </div>
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default AudioRecorder;
