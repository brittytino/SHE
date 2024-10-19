import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
import { NotificationIcon } from "../icons/navbar/notificationicon";

export const NotificationsDropdown = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <NavbarItem>
          <NotificationIcon />
        </NavbarItem>
      </DropdownTrigger>
      <DropdownMenu className="w-80" aria-label="Safety Notifications">
        <DropdownSection title="Notifications">
          {/* Notification 1: Emergency Contact Alert */}
          <DropdownItem
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            key="1"
            description="Your emergency contact has been notified about your location."
          >
            🚨 Emergency Alert Sent
          </DropdownItem>

          {/* Notification 2: Safety Tip */}
          <DropdownItem
            key="2"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            description="Remember to always keep your GPS enabled for real-time tracking in case of emergencies."
          >
            🛡️ Safety Tip: Stay GPS Enabled
          </DropdownItem>

          {/* Notification 3: Location Shared */}
          <DropdownItem
            key="3"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            description="Your current location has been shared with your trusted contacts."
          >
            📍 Location Shared
          </DropdownItem>

          {/* Notification 4: Check-in Reminder */}
          <DropdownItem
            key="4"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            description="Don't forget to check in with your trusted circle every hour when traveling alone."
          >
            ⏰ Safety Check-In Reminder
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
