import React, { useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Community } from "../icons/community";

const phoneNumber = "91978635037"; // Your Indian phone number

export const CardBalance1: React.FC = () => {
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  const fetchLocationAndCreateWhatsAppUrl = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const message = `I'm at this location: https://www.google.com/maps?q=${latitude},${longitude}`;
          const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
          setWhatsappUrl(url);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Card
      className="xl:max-w-sm bg-primary rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer w-full"
      onClick={(e) => {
        if (!whatsappUrl) {
          e.preventDefault(); // Prevent link navigation if URL is not ready
          fetchLocationAndCreateWhatsAppUrl();
        } else {
          window.open(whatsappUrl, "_blank"); // Open WhatsApp with the URL
        }
      }}
      style={{ cursor: 'pointer' }}
    >
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-white">Share Your Location</span>
            <span className="text-white text-xs">Click Here!</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};