import React, { useState } from "react";
import { Card, CardBody, Button, Modal, Spinner } from "@nextui-org/react";
import { Community } from "../icons/community"; // Assuming you have this icon

// Function to construct the WhatsApp URL with the location
const sendWhatsAppMessage = (location: string) => {
  const phoneNumber = "919786350537"; // Default Indian number (add country code for India)
  const message = `🚨 Emergency! Please help me. My current location is: ${location}`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
};

export const CardBalance1 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Function to handle the card click and open the modal
  const handleClick = () => {
    setIsModalOpen(true);
  };

  // Function to handle location sharing
  const handleLocationShare = () => {
    setIsLoading(true);
    setStatusMessage(""); // Clear previous status messages
    setIsModalOpen(false); // Close modal when confirmed

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = `https://www.google.com/maps?q=${latitude},${longitude}`;
          sendWhatsAppMessage(location); // Send location via WhatsApp
          setStatusMessage("📍 Live location has been shared successfully!");
          setIsLoading(false);
        },
        (error) => {
          setStatusMessage("❌ Unable to fetch location. Please enable location services.");
          setIsLoading(false);
        }
      );
    } else {
      setStatusMessage("❌ Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card
        className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full cursor-pointer"
        onClick={handleClick} // Open modal on card click
      >
        <CardBody className="py-5 overflow-hidden">
          <div className="flex gap-2.5 items-center">
            <Community />
            <div className="flex flex-col">
              <span className="text-white">Live Location Sharing</span>
              <span className="text-white text-xs">1311 Active Users</span>
            </div>
          </div>
          {isLoading && (
            <div className="flex justify-center mt-3">
              <Spinner color="white" />
            </div>
          )}
          {statusMessage && (
            <div className="text-white text-xs mt-3 text-center">
              {statusMessage}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Modal for confirmation */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <h3 className="text-lg font-semibold">Confirm Location Sharing</h3>
          <p>Do you want to share your live location via WhatsApp?</p>
        </div>
        <div className="flex justify-end p-4 gap-2">
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button onClick={handleLocationShare}>Share Location</Button>
        </div>
      </Modal>
    </>
  );
};
