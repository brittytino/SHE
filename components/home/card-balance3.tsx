import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Community } from "../icons/community";

export const CardBalance3 = () => {
  return (
    <Card className="xl:max-w-sm bg-gradient-to-r from-green-400 to-teal-500 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-default-900">Emergency Contact</span>
            <span className="text-default-900 text-xs">Add or remove trusted contacts</span>
          </div>
        </div>
        
      </CardBody>
    </Card>
  );
};


