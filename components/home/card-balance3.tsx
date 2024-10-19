import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";

export const CardBalance3 = () => {
  return (
    <Card className="xl:max-w-sm bg-success rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-white">Emergency Contact</span>
            <span className="text-white text-xs">Add or remove trusted contacts</span>
          </div>
        </div>
        
      </CardBody>
    </Card>
  );
};
