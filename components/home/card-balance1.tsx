import { Card, CardBody, Input, Button } from "@nextui-org/react";
import React, { useState } from "react";
import { Community } from "../icons/community";

export const CardBalance1 = () => {
  const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number
  const [location, setLocation] = useState(null);
  const [isSending, setIsSending] = useState(false); // State to handle loading state

  // Function to fetch user's current location
  const handleLocationClick = async () => {
    if (!/^\d{10}$/.test(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (navigator.geolocation) {
      setIsSending(true); // Set loading state to true
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          
          // Send location to emergency contact
          await sendLocationToEmergencyContact(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location: ", error);
          setIsSending(false); // Stop loading state on error
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Function to send the location via backend (e.g., Twilio)
  const sendLocationToEmergencyContact = async (latitude, longitude) => {
    try {
      const response = await fetch("/api/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: `+91${phoneNumber}`, // Emergency contact number with +91
          message: `Emergency! Current Location: https://www.google.com/maps?q=${latitude},${longitude}`,
        }),
      });

      if (!response.ok) {
        console.error("Failed to send SMS.");
      } else {
        console.log("SMS sent successfully!");
      }
    } catch (error) {
      console.error("Error sending SMS: ", error);
    } finally {
      setIsSending(false); // Stop loading state after SMS is sent
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="xl:max-w-sm bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl shadow-md w-full">
        <CardBody className="py-5 overflow-hidden text-center text-white">
          <div className="flex gap-2.5 justify-center mb-4">
            <Community />
            <div className="flex flex-col">
              <span className="text-2xl font-semibold">Live Location Sharing</span>
              <span className="text-sm">1311 Active User&apos;s</span>
            </div>
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Phone Number"
              value={phoneNumber}
              placeholder="Enter 10-digit number"
              maxLength={10}
              className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <Button
            className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white w-full font-bold py-2 rounded-lg transition-all duration-200"
            onPress={handleLocationClick}
            isLoading={isSending}
          >
            {isSending ? "Sending..." : "Send Emergency SMS"}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};