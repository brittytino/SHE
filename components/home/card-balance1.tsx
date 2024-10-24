import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Community } from "../icons/community";

export const CardBalance1 = () => {
  const whatsappUrl = "https://api.whatsapp.com/send?phone=+919786350537&text=My%20current%20location%20is%3A%2011.022569%2C%2076.987490";

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
      <Card className="xl:max-w-sm bg-primary-500 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer w-full">
        <CardBody className="py-5">
          <div className="flex gap-2.5">
            <Community />
            <div className="flex flex-col">
              <span className="text-default-900">Share Your Location</span>
              <span className="text-default-900 text-xs">Click Here!</span>
            </div>
          </div>
        </CardBody>
      </Card>
    </a>
  );
};
