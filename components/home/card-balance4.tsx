import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";

export const CardBalance4 = () => {
  return (
    <a
      href="https://eservices.tnpolice.gov.in/CCTNSNICSDC/ComplaintRegistrationPage?0"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Card className="xl:max-w-sm bg-red-500 rounded-xl shadow-md px-3 w-full cursor-pointer">
        <CardBody className="py-5">
          <div className="flex gap-2.5">
            <Community />
            <div className="flex flex-col">
              <span className="text-default-900">Wanna Raise Complaint?</span>
              <span className="text-default-900 text-xs">Click Here!</span>
            </div>
          </div>
        </CardBody>
      </Card>
    </a>
  );
};
