import React from "react";

// Define the props interface for the OnlineIcon component
interface OnlineIconProps {
  className?: string; // The className prop is optional and is of type string
}

// Use the props in the component
const OnlineIcon: React.FC<OnlineIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <circle cx="12" cy="12" r="10" className="text-green-500" />
      <line x1="12" y1="6" x2="12" y2="18" strokeLinecap="round" />
      <line x1="6" y1="12" x2="18" y2="12" strokeLinecap="round" />
    </svg>
  );
};

export default OnlineIcon;
