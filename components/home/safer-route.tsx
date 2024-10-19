// SaferRoute.tsx
import { Avatar, Card, CardBody, Button } from "@nextui-org/react";
import React from "react";
import { FaMapMarkerAlt, FaShieldAlt } from "react-icons/fa";

const travelItems = [
  {
    name: "Anjali",
    picture: "https://img.freepik.com/free-photo/photorealistic-lohri-festival-with-woman-celebrating_23-2151098199.jpg?t=st=1729314981~exp=1729318581~hmac=cee2afa64be84797f3b59985cee35492c3ffe62b32dd48f7e865d0aa1b0544db&w=740",
    route: "RS Puram → Town Hall → Gandhipuram",
    safetyRating: "Safe",
  },
  {
    name: "Divya Rajendran",
    picture: "https://img.freepik.com/free-photo/woman-celebrating-indian-republic-day_23-2151142231.jpg?t=st=1729315041~exp=1729318641~hmac=b85b5b3f6e3c1f3e2e4978718348a6338b18dcb43e2d50e365f88eef3797112b&w=826",
    route: "Coimbatore North → Peelamedu → Singanallur",
    safetyRating: "Moderate",
  },
  {
    name: "Lakshmi Subramanian",
    picture: "https://img.freepik.com/free-photo/woman-celebrating-indian-republic-day_23-2151142257.jpg?t=st=1729315063~exp=1729318663~hmac=548a0e949250f07907c53f703a460bee0c6f52484b27dada632a7dd156f8b066&w=826",
    route: "Podanur → Ukkadam → Tidel Park",
    safetyRating: "Safe",
  },
  {
    name: "Pooja Balasubramanian",
    picture: "https://img.freepik.com/free-photo/vivid-colors-portrait-woman-navratri-celebration_23-2151262883.jpg?t=st=1729315101~exp=1729318701~hmac=24f6a5dbd2319530c64b511c1997aa06e8da01f6883a477af1178370a3f37887&w=826",
    route: "Saravanampatti → Peelamedu → Thudiyalur",
    safetyRating: "Unsafe",
  },
  {
    name: "Sneha Venkat",
    picture: "https://img.freepik.com/free-photo/vivid-colors-portrait-woman-navratri-celebration_23-2151262888.jpg?t=st=1729314910~exp=1729318510~hmac=1642b61a61fb0d2a48ce5a6c2f518cd326fcad6caf3efcd32b4838ab79ed9b22&w=826",
    route: "Chinniyampalayam → Kavundampalayam → Sulur",
    safetyRating: "Safe",
  },
];

const SaferRoute = () => {
  return (
    <Card className="bg-default-90 rounded-xl shadow-md px-4 md:px-6 lg:px-8">
      <CardBody className="py-5 gap-4">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold flex items-center">
              <FaMapMarkerAlt className="mr-2 text-lg" /> Safe Routes History
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {travelItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center bg-default-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-4"
            >
              <div className="flex justify-center items-center mb-4 sm:mb-0 sm:mr-4">
                <Avatar isBordered color="secondary" src={item.picture} />
              </div>
              <div className="flex-1 text-center">
                <span className="text-default-900 font-semibold block">{item.name}</span>
                <div className="text-default-700 text-sm flex items-center justify-center">
                  <FaMapMarkerAlt className="mr-1" /> {item.route}
                </div>
                <div
                  className={`text-xs flex items-center justify-center ${
                    item.safetyRating === "Safe"
                      ? "text-success"
                      : item.safetyRating === "Moderate"
                      ? "text-warning"
                      : "text-danger"
                  }`}
                >
                  <FaShieldAlt className="mr-1" /> {item.safetyRating}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <Button color="primary" className="w-full md:w-auto">
            View More Routes
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default SaferRoute;
