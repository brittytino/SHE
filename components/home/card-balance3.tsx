import React, { useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { FaPhoneAlt, FaSms, FaPlus, FaTrash } from "react-icons/fa";
import OnlineIcon from "../icons/OnlineIcon"; // Ensure this path is correct
import { Dialog, Transition, DialogPanel, TransitionChild } from '@headlessui/react';

// Define the type for an emergency contact
interface Contact {
  name: string;
  phone: string;
}

const CardBalance3: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState<Contact[]>([
    { name: "Father", phone: "+91 9876543210" },
    { name: "Mother", phone: "+91 8765432109" },
    { name: "Brother", phone: "+91 7654321098" },
  ]);
  const [newContact, setNewContact] = useState<Contact>({ name: "", phone: "" });

  function closeModal() {
    setIsOpen(false);
    setNewContact({ name: "", phone: "" }); // Reset input fields
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleAddContact() {
    if (newContact.name && newContact.phone) {
      setEmergencyContacts([...emergencyContacts, newContact]);
      setNewContact({ name: "", phone: "" }); // Reset input fields after adding
    }
  }

  function handleRemoveContact(index: number) {
    const updatedContacts = emergencyContacts.filter((_, i) => i !== index);
    setEmergencyContacts(updatedContacts);
  }

  return (
    <>
      <Card 
        onClick={openModal} // Ensure this function is called on click
        className="xl:max-w-sm bg-gradient-to-r from-green-400 to-teal-500 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer w-full"
      >
        <CardBody className="py-5">
          <div className="flex gap-2.5">
            <OnlineIcon className="w-6 h-6 text-white" />
            <div className="flex flex-col">
              <span className="text-default-900">Emergency Contact</span>
              <span className="text-default-900 text-xs">Add or remove trusted contacts</span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Modal Popup */}
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"></div>
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <DialogPanel className="max-w-md w-full bg-white rounded-lg shadow-xl transform transition-all">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-500 p-6 rounded-t-lg">
                  <h2 className="text-white text-xl font-bold">Emergency Contacts</h2>
                  <p className="text-white text-sm">Quick access to your trusted people</p>
                </div>

                {/* Add New Contact Section */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Name"
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                      className="border border-gray-300 rounded-lg p-2 flex-grow focus:outline-none focus:ring focus:ring-blue-400"
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                      className="border border-gray-300 rounded-lg p-2 flex-grow focus:outline-none focus:ring focus:ring-blue-400"
                    />
                    <button onClick={handleAddContact} className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors">
                      <FaPlus />
                    </button>
                  </div>

                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-150">
                      <div>
                        <h3 className="text-gray-800 font-semibold">{contact.name}</h3>
                        <p className="text-gray-600 text-sm">{contact.phone}</p>
                      </div>
                      <div className="flex space-x-4">
                        <a href={`tel:${contact.phone}`} className="text-green-500 hover:text-green-700">
                          <FaPhoneAlt size={20} />
                        </a>
                        <a href={`sms:${contact.phone}`} className="text-blue-500 hover:text-blue-700">
                          <FaSms size={20} />
                        </a>
                        <button onClick={() => handleRemoveContact(index)} className="text-red-500 hover:text-red-700">
                          <FaTrash size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Close Button */}
                <div className="p-4 text-right">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CardBalance3; // Export the component
