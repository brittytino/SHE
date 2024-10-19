import React, { useState, useEffect } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { FaBell, FaStop } from 'react-icons/fa';
import { Howl } from 'howler';
import axios from 'axios';

export const PanicButton: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isAlerting, setIsAlerting] = useState(false);

  // Load the sound from the public directory
  const sound = new Howl({
    src: ['/assets/sos.mp3'], // Adjusted path for Next.js public directory
    volume: 1.0,
    loop: true,
  });

  // Function to send SMS alert
  const sendAlertSMS = async (message: string) => {
    try {
      const response = await axios.post('/api/send-sms', {
        message,
        number: '+919786350537', // International format for Indian number
      });
      console.log('SMS sent successfully:', response.data);
    } catch (error) {
      console.error('Failed to send SMS', error);
    }
  };

  // Handle panic button click
  const handlePanicClick = () => {
    if (isAlerting) {
      stopAlert();
    } else {
      startAlert();
    }
  };

  // Start alert process
  const startAlert = () => {
    sound.play();
    setIsAlerting(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        const alertMessage = `🚨 *Emergency Alert!* 🚨\nLocation: Lat ${latitude}, Long ${longitude}\nPlease take immediate action!\n\n*Web App SHE*`;
        sendAlertSMS(alertMessage);
        alert(alertMessage);
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }

    if (navigator.vibrate) {
      navigator.vibrate([500, 500, 500]); // Vibrate for 500ms
    }
  };

  // Stop alert process
  const stopAlert = () => {
    sound.stop();
    setIsAlerting(false);

    const safeMessage = `✅ *I'm safe now!*\nNo further action is needed.\nThank you for your concern.\n\n*Web App SHE*`;
    sendAlertSMS(safeMessage);
    alert(safeMessage);

    if (navigator.vibrate) {
      navigator.vibrate(0); // Stop vibrating
    }
  };

  // Clean up sound on unmount
  useEffect(() => {
    return () => {
      sound.unload();
    };
  }, [sound]);

  return (
    <Card className="bg-red-500 text-white rounded-xl shadow-md px-3">
      <CardBody className="py-5 flex flex-col items-center gap-4">
        <FaBell size={40} className="text-white" />
        <span className="text-xl font-semibold">{isAlerting ? 'Alert Active!' : 'Panic Button'}</span>
        <button
          className={`${
            isAlerting ? 'bg-red-600' : 'bg-white'
          } text-red-500 p-3 rounded-full shadow-lg hover:bg-red-100 transition`}
          onClick={handlePanicClick}
        >
          {isAlerting ? <FaStop size={24} /> : 'Trigger Panic Alert'}
        </button>

        {location && (
          <div className="mt-4 text-center">
            <p>Location:</p>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
