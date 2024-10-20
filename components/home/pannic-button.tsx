import React, { useState, useEffect } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Howl } from 'howler';

export const PanicButton: React.FC = () => {
  const [isAlerting, setIsAlerting] = useState(false);
  const [vibrationInterval, setVibrationInterval] = useState<NodeJS.Timeout | null>(null);
  const [locationLink, setLocationLink] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [useRecentContact, setUseRecentContact] = useState<boolean>(true);

  const defaultPhoneNumber = '9786350537'; // Default recent contact

  // Load SOS sound
  const sound = new Howl({
    src: ['/assets/sos.mp3'],
    volume: 1.0,
    loop: true,
  });

  // Fetch live location
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
          setLocationLink(locationUrl);
          sendLocationToWhatsApp(locationUrl);
        },
        (error) => {
          console.error('Error fetching location:', error);
          setLocationLink(null);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLocationLink(null);
    }
  };

  // Prompt user to input phone number (only 10 digits)
  const askForPhoneNumber = () => {
    const userInput = prompt('Please enter a 10-digit phone number:');
    const validPhoneNumber = validatePhoneNumber(userInput);

    if (validPhoneNumber) {
      setPhoneNumber(validPhoneNumber);
      setUseRecentContact(false); // Use the entered number
      localStorage.setItem('phoneNumber', validPhoneNumber);
    } else {
      alert('Please enter a valid 10-digit Indian phone number.');
    }
  };

  // Validate the phone number (10 digits only, we assume +91 by default)
  const validatePhoneNumber = (number: string | null): string | null => {
    const regex = /^\d{10}$/;
    return number && regex.test(number) ? `+91${number}` : null; // Automatically prepend +91
  };

  // Open WhatsApp with pre-filled message
  const sendLocationToWhatsApp = (location: string) => {
    const contact = useRecentContact ? `+91${defaultPhoneNumber}` : phoneNumber;
    const message = `🚨 Emergency! I need help. My live location: ${location}`;
    const url = `https://wa.me/${contact}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
  };

  // Start alert
  const startAlert = () => {
    sound.play();
    setIsAlerting(true);
    fetchLocation();

    if (navigator.vibrate) {
      const interval = setInterval(() => {
        navigator.vibrate([500, 500, 500]);
      }, 1000);
      setVibrationInterval(interval);
    }
  };

  // Stop alert
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

  // Handle panic button click
  const handlePanicClick = () => {
    if (isAlerting) {
      stopAlert();
    } else {
      startAlert();
    }
  };

  // Load phone number from localStorage on initial render
  useEffect(() => {
    const savedPhoneNumber = localStorage.getItem('phoneNumber');
    if (savedPhoneNumber) {
      setPhoneNumber(savedPhoneNumber);
    }

    return () => {
      sound.unload();
      if (vibrationInterval) {
        clearInterval(vibrationInterval);
      }
    };
  }, [vibrationInterval]);

  return (
    <Card className="w-full max-w-md bg-gradient-to-r from-blue-50 to-indigo-100 justify-center items-center bg-white border border-gray-200 rounded-xl shadow-xl p-6">
      <CardBody className="flex flex-col items-center">
        <FaExclamationTriangle
          size={80}
          className="text-red-600 animate-pulse cursor-pointer"
          onClick={handlePanicClick}
        />
        <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-6">
          {isAlerting ? 'Stop SOS Alert' : 'Emergency SOS'}
        </h2>

        {locationLink && (
          <p className="text-gray-600 text-sm text-center">
            Sharing live location: <a href={locationLink} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">{locationLink}</a>
          </p>
        )}

        <div className="w-full">
          <div className="flex flex-col items-center mb-4">
            <label className="text-sm font-medium text-gray-600">User Contact</label>
            <button
              className={`mt-2 px-4 py-2 text-sm rounded-lg border ${useRecentContact ? 'border-gray-300 text-gray-500' : 'border-green-500 text-green-600'}`}
              onClick={askForPhoneNumber}
            >
              {phoneNumber ? `Send to: ${phoneNumber}` : 'Enter new phone number'}
            </button>
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-600">Recent Contact</label>
            <button
              className={`mt-2 px-4 py-2 text-sm rounded-lg border ${useRecentContact ? 'border-green-500 text-green-600' : 'border-gray-300 text-gray-500'}`}
              onClick={() => setUseRecentContact(true)}
            >
              Send to: +91{defaultPhoneNumber}
            </button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
