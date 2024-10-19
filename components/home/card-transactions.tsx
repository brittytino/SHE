import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaShieldAlt, FaBell, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

// Define the log type
interface SafetyLog {
  action: string;
  icon: React.ReactNode;
  status: string;
  date: string; // Add date property
}

// Sample safety-related logs
const initialSafetyLogs: SafetyLog[] = [
  {
    action: "Safety Alert Activated",
    icon: <FaBell />,
    status: "In Progress",
    date: "", // Initialize empty date
  },
  {
    action: "Shared Location",
    icon: <FaMapMarkerAlt />,
    status: "Completed",
    date: "",
  },
  {
    action: "Contacted Emergency Services",
    icon: <FaShieldAlt />,
    status: "Alert Sent",
    date: "",
  },
  {
    action: "Safety Check Completed",
    icon: <FaCheckCircle />,
    status: "Safe",
    date: "",
  },
];

export const CardSafetyLogs = () => {
  const [safetyLogs, setSafetyLogs] = useState<SafetyLog[]>(initialSafetyLogs);

  // Function to get today's date
  const getTodayDate = () => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date().toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const updatedLogs = safetyLogs.map(log => ({ ...log, date: getTodayDate() }));
    setSafetyLogs(updatedLogs);
  }, []);

  return (
    <Card className="bg-default-50 rounded-xl shadow-md p-4">
      <CardBody className="py-5">
        {/* Header section */}
        <div className="flex justify-center mb-4">
          <div className="border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              Women Safety - Activity Log
            </span>
          </div>
        </div>

        {/* List of logs */}
        <div className="flex flex-col gap-4">
          {safetyLogs.map((log, index) => (
            <div key={index} className="flex items-center justify-between border-b py-2">
              {/* Safety Icon */}
              <div className="flex justify-center text-default-900 w-1/4">
                {log.icon}
              </div>

              {/* Action Name */}
              <span className="text-default-600 font-semibold w-2/4 text-center">{log.action}</span>

              {/* Status */}
              <div className="w-1/4 text-center">
                <span
                  className={`text-xs font-semibold ${
                    log.status === "Safe"
                      ? "text-green-600"
                      : log.status === "Alert Sent"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {log.status}
                </span>
              </div>

              {/* Date */}
              <div className="w-1/4 text-center">
                <span className="text-default-500 text-xs">{log.date}</span>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
