import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";

export const CardBalance4 = () => {
  return (
    <Card className="xl:max-w-sm bg-default-50 rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-default-900">Access Corporate Mode</span>
            <span className="text-default-900 text-xs">Switch to corporate safety tracking </span>
          </div>
        </div>
        
      </CardBody>
    </Card>
  );
};
