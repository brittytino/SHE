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

  // Send "I'm safe" message to WhatsApp
  const sendSafeMessage = () => {
    const contact = useRecentContact ? `+91${defaultPhoneNumber}` : phoneNumber;
    const message = `✅ I'm safe!`;
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
    sound.stop(); // Ensure the sound stops
    setIsAlerting(false);
    sendSafeMessage(); // Send "I'm safe" message

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
      stopAlert(); // Stop the alert
    } else {
      startAlert(); // Start the alert
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
    <Card className="bg-default-50 rounded-xl shadow-md px-4 py-6 w-full mx-auto transition-transform transform hover:scale-105">
      <CardBody className="flex flex-col items-center">
        <FaExclamationTriangle
          size={100}
          className={`text-yellow-400 animate-pulse cursor-pointer mb-4 ${isAlerting ? 'transform scale-110' : ''}`}
          onClick={handlePanicClick}
        />
        <h2 className="text-white-800 text-xl font-bold mb-4">
          {isAlerting ? 'Stop SOS Alert' : 'Emergency SOS'}
        </h2>

        {locationLink && (
          <p className="text-gray-600 mb-4">
            Sharing live location: 
            <a href={locationLink} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
              {locationLink}
            </a>
          </p>
        )}

        <div className="w-full mt-4 flex flex-col items-center">
          <label className="text-sm font-medium mb-2">Select User Contact</label>
          <div className="flex items-center">
            <span className={`mr-2 ${useRecentContact ? 'text-yellow-600' : 'text-gray-400'}`}>Recent Contact</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={useRecentContact}
                onChange={() => {
                  if (useRecentContact) {
                    setUseRecentContact(false); // Switch to entering new number
                    askForPhoneNumber();
                  } else {
                    setUseRecentContact(true); // Switch to recent contact
                  }
                }}
              />
              <span className="slider round"></span>
            </label>
            <span className={`ml-2 ${!useRecentContact ? 'text-yellow-600' : 'text-gray-400'}`}>Enter Number</span>
          </div>
        </div>
      </CardBody>
      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
          margin: 0 10px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 34px;
          border: 2px solid #d1d1d1;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        input:checked + .slider {
          background-color: #66bb6a;
          border-color: #5cb85c;
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }

        /* Hover effect for the card */
        .hover\:scale-105:hover {
          transform: scale(1.05);
        }
      `}</style>
    </Card>
  );
};
