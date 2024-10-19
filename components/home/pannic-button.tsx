import React, { useState, useEffect } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Howl } from 'howler';

export const PanicButton: React.FC = () => {
  const [isAlerting, setIsAlerting] = useState(false);
  const [vibrationInterval, setVibrationInterval] = useState<NodeJS.Timeout | null>(null);

  // Load a loud SOS sound
  const sound = new Howl({
    src: ['/assets/sos.mp3'], // Correct path for Next.js
    volume: 1.0,
    loop: true,
    onplayerror: () => {
      console.error('Error playing sound. Check the file path or format.');
    },
  });

  const handlePanicClick = async () => {
    if (isAlerting) {
      stopAlert();
    } else {
      startAlert();
      await fetchLocation();
    }
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          sendLocationToWhatsApp(latitude, longitude);
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const sendLocationToWhatsApp = (latitude: number, longitude: number) => {
    const message = `Emergency! I need help. My location: https://maps.google.com/?q=${latitude},${longitude}`;
    const phoneNumber = '+9109786350537'; // WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank'); // Open the WhatsApp chat in a new tab
  };

  const startAlert = () => {
    sound.play();
    setIsAlerting(true);

    if (navigator.vibrate) {
      const interval = setInterval(() => {
        navigator.vibrate([500, 500, 500]);
      }, 1000);
      setVibrationInterval(interval);
    }
  };

  const stopAlert = () => {
    sound.stop();
    setIsAlerting(false);

    if (vibrationInterval) {
      clearInterval(vibrationInterval);
      setVibrationInterval(null);
    }

    if (navigator.vibrate) {
      navigator.vibrate(0);
    }
  };

  useEffect(() => {
    return () => {
      sound.unload();
      if (vibrationInterval) {
        clearInterval(vibrationInterval);
      }
    };
  }, [vibrationInterval]);

  return (
    <Card className="bg-red-600 text-white rounded-xl shadow-md px-4">
      <CardBody className="py-6 flex flex-col items-center gap-5">
        <FaExclamationTriangle
          size={70}
          className="text-yellow-300 cursor-pointer transition-transform duration-300 hover:scale-110"
          onClick={handlePanicClick}
        />
        <h2 className="text-2xl font-bold">Emergency SOS</h2>
      </CardBody>
    </Card>
  );
};
