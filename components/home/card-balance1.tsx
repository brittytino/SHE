import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";

export const CardBalance1 = () => {
  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const message = `I'm at this location: https://www.google.com/maps?q=${latitude},${longitude}`;
          const phone = "91978635037"; // Your Indian phone number
          const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, "_blank");
        },
        (error) => {
          console.error("Error getting location:", error);
          let errorMessage = "Unable to retrieve your location.";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Permission denied. Please allow location access.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "The request to get user location timed out.";
              break;
          }
          alert(errorMessage);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Card
      className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full"
      onClick={handleClick}
      style={{ cursor: 'pointer' }} // Change cursor to pointer for better UX
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
