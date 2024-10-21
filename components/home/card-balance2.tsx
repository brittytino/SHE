import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";

export const CardBalance2 = () => {
  return (
    <Card className="xl:max-w-sm bg-yellow-500 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-default-900">Route Safety Monitoring</span>
            <span className="text-default-900 text-xs">Suggestions for safer routes</span>
          </div>
        </div>
        
      </CardBody>
    </Card>
  );
};
