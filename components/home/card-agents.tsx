import React, { useState, useEffect } from "react";
import { Avatar, AvatarGroup, Card, CardBody } from "@nextui-org/react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

// Define the required libraries for the Google Maps API
const libraries: ('places')[] = ["places"]; // Ensure this is typed correctly

// Define the styling for the map container
const mapContainerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "15px",
};

// Default center coordinates (will be overridden by user location)
const defaultCenter = {
  lat: 10.99835602,
  lng: 77.01502627,
};

export const CardAgents = () => {
  // Load the Google Maps script with the API key
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBL-lUIlfcsTazBIZeF_PEQxfz5aqBNi-M", // Replace with your actual API key
    libraries,
  });

  // State to store the user's location (default to center coordinates)
  const [location, setLocation] = useState(defaultCenter);

  // Fetch the user's current location using the browser's geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Update the location state with the user's coordinates
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location", error);
        }
      );
    }
  }, []);

  // Handle any error in loading the Google Map script
  if (loadError) return <div>Error loading map</div>;

  // Show a loading message while the Google Maps script is loading
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <Card className="bg-default-50 rounded-xl shadow-md px-4 py-6 w-full">
      <CardBody className="py-5 gap-6">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              {"⭐"} Meet your Friends&apos;
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 flex-col">
          <span className="text-xs text-center">
            Women&apos;s Safety First! You can track your location and stay connected with nearby trusted contacts.
          </span>

          {/* AvatarGroup showcasing nearby friends (example) */}
          <AvatarGroup isBordered>
            <Avatar src="https://img.freepik.com/free-photo/vivid-colors-portrait-woman-navratri-celebration_23-2151262874.jpg?t=st=1729314891~exp=1729318491~hmac=a81b6a24e9805d7d7d5d42d0bd6069015cba8984a3b68f0b7b3d9e39c6a07108&w=826" />
            <Avatar src="https://img.freepik.com/free-photo/vivid-colors-portrait-woman-navratri-celebration_23-2151262888.jpg?t=st=1729314910~exp=1729318510~hmac=1642b61a61fb0d2a48ce5a6c2f518cd326fcad6caf3efcd32b4838ab79ed9b22&w=826" />
            <Avatar src="https://img.freepik.com/free-photo/vivid-colors-portrait-woman-navratri-celebration_23-2151262877.jpg?t=st=1729314927~exp=1729318527~hmac=ab1ac2c7c32d271ba0b51acc46465ce11fa6170285648ec9f911bf442d215105&w=826" />
            <Avatar src="https://img.freepik.com/free-photo/vivid-colors-portrait-woman-navratri-celebration_23-2151262871.jpg?t=st=1729314962~exp=1729318562~hmac=ebb47e3fe7e48f39fb45622692e1082bdc89d4dfa96b41ed0994576b0a63145d&w=826" />
            <Avatar src="https://img.freepik.com/free-photo/photorealistic-lohri-festival-with-woman-celebrating_23-2151098199.jpg?t=st=1729314981~exp=1729318581~hmac=cee2afa64be84797f3b59985cee35492c3ffe62b32dd48f7e865d0aa1b0544db&w=740" />
          </AvatarGroup>

          {/* Google Map to display the user's current location */}
          <div className="w-full mt-4">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={15} // Adjust the zoom level to your preference
              center={location} // Center the map on the user's current location
            >
              <Marker position={location} /> {/* Add marker directly */}
            </GoogleMap>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
