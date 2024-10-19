import { Card, CardBody, Spinner } from "@nextui-org/react";
import React, { useState } from "react";
import { Community } from "../icons/community";

// Function to construct the WhatsApp URL with the location
const sendWhatsAppMessage = (location: string) => {
  const message = `🚨 Emergency! Please help me. My current location is: ${location}`;
  const phoneNumber = "+919786350537"; // The contact number to send the message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  // Open WhatsApp Web with the prefilled message
  window.open(whatsappUrl, "_blank");
};

export const CardBalance1 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Function to handle card click and fetch the user's location
  const handleClick = () => {
    setIsLoading(true);
    setStatusMessage(null);

    // Check if geolocation is available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = `https://www.google.com/maps?q=${latitude},${longitude}`;
          // Send the location via WhatsApp
          sendWhatsAppMessage(location);
          setStatusMessage("Location shared via WhatsApp!");
          setIsLoading(false);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setStatusMessage("Unable to fetch location. Please enable location services.");
          setIsLoading(false);
        }
      );
    } else {
      setStatusMessage("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  };

  return (
    <Card
      className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full cursor-pointer"
      onClick={handleClick}
    >
      <CardBody className="py-5 overflow-hidden">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-white">Live Location Sharing</span>
            <span className="text-white text-xs">1311 Active User&apos;s</span>
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center mt-3">
            <Spinner color="white" />
          </div>
        )}

        {/* Status Message */}
        {statusMessage && (
          <div className="text-white text-xs mt-3 text-center">
            {statusMessage}
          </div>
        )}
      </CardBody>
    </Card>
  );
};
