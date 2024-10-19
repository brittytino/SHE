import React, { useState, useEffect } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { FaBell, FaStop } from 'react-icons/fa';
import { Howl } from 'howler';

export const PanicButton: React.FC = () => {
  const [isAlerting, setIsAlerting] = useState(false);

  // Load a loud sound
  const sound = new Howl({
    src: ['https://www.soundjay.com/button/sounds/beep-07.mp3'], // Loud beep sound
    volume: 1.0,
    loop: true, // Loop the sound
  });

  const handlePanicClick = () => {
    if (isAlerting) {
      stopAlert();
    } else {
      startAlert();
    }
  };

  const startAlert = () => {
    sound.play();
    setIsAlerting(true);

    // Continuous vibration
    if (navigator.vibrate) {
      navigator.vibrate([500, 500, 500]); // Vibrate pattern
    }
  };

  const stopAlert = () => {
    sound.stop();
    setIsAlerting(false);

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
      </CardBody>
    </Card>
  );
};
