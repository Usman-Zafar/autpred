"use client";
import React, { useState, ChangeEvent } from "react";
import TherapistNavbar from "@/components/TherapistNavigation";
import Link from "next/link";

const TherapyDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [childName, setChildName] = useState("");
  const [therapySession, setTherapySession] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    childName: "",
    therapySession: "",
    selectedDate: "",
    selectedTime: "",
  });

  const today = new Date();
  const currentDate = today.toISOString().split("T")[0];
  let hours = today.getHours();
  let minutes: string | number = today.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const currentTime = hours + ":" + minutes + " " + ampm;

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
  };

  // Function to validate if all fields are filled
  const validateForm = () => {
    let errors = {
      childName: "",
      therapySession: "",
      selectedDate: "",
      selectedTime: "",
    };
    let formIsValid = true;

    if (!childName) {
      formIsValid = false;
      errors.childName = "Child Name is required";
    }

    if (!therapySession) {
      formIsValid = false;
      errors.therapySession = "Therapy Session is required";
    }

    if (!selectedDate) {
      formIsValid = false;
      errors.selectedDate = "Therapy Date is required";
    }

    if (!selectedTime) {
      formIsValid = false;
      errors.selectedTime = "Therapy Time is required";
    }

    setErrorMessage(errors);
    return formIsValid;
  };

  return (
    <>
      <TherapistNavbar />
      <div className="center-content flex flex-col items-center flex-1 mt-4 w-full">
        <div className="flex justify-center items-center gap-x-2 w-full px-2">
          <Link href="/therapy-details" className="w-1/2">
            <button className="px-4 py-2 rounded bg-transparent w-full border-green-500 border text-black hover:bg-green-600">
              Upcoming Therapies
            </button>
          </Link>
          <Link href="/therapy-details" className="w-1/2">
            <button className="px-4 py-2 rounded bg-transparent w-full border-green-500 border text-black hover:bg-green-600">
              Previous Therapies
            </button>
          </Link>
        </div>
        <div className="flex gap-x-2 w-full px-2 items-center justify-center h-full">
          <div className="w-1/2 px-2">
            {/* Add logic to display upcoming therapies from API */}
            {/* Display upcoming therapies */}
            <button
              onClick={openDialog}
              className="px-4 py-2 rounded bg-transparent border-green-500 border text-black hover:bg-green-600 mt-4"
            >
              Add Upcoming Therapy
            </button>
          </div>
          <div className="w-1/2 px-2">
            {/* Add logic to display previous therapies from API */}
            {/* Display previous therapies */}
          </div>
        </div>
        {isOpen && (
          <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                ​
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        Add Upcoming Therapy
                      </h3>
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Child Name"
                          className="w-full px-2 py-1 border rounded"
                        />
                        {errorMessage.childName && <p className="text-red-500">{errorMessage.childName}</p>}

                        <input
                          type="text"
                          placeholder="Therapy Session"
                          className="w-full px-2 py-1 border rounded mt-2"
                        />
                        {errorMessage.therapySession && <p className="text-red-500">{errorMessage.therapySession}</p>}

                        <input
                          type="date"
                          placeholder="Therapy Date"
                          className="w-full px-2 py-1 border rounded mt-2"
                          min={currentDate}
                          value={selectedDate}
                          onChange={handleDateChange}
                        />
                        {errorMessage.selectedDate && <p className="text-red-500">{errorMessage.selectedDate}</p>}

                        <input
                          type="time"
                          placeholder="Therapy Time"
                          className="w-full px-2 py-1 border rounded mt-2"
                          min={selectedDate === currentDate ? currentTime : "00:00"}
                          value={selectedTime}
                          onChange={handleTimeChange}
                        />
                        {errorMessage.selectedTime && <p className="text-red-500">{errorMessage.selectedTime}</p>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={() => {
                      if (validateForm()) {
                        // Add logic here for what happens when form is valid and ready for submission
                      }
                    }}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add to Schedule
                  </button>
                  <button
                    type="button"
                    onClick={closeDialog}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TherapyDetails;
