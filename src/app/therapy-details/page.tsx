"use client";
import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import TherapistNavbar from "@/components/TherapistNavigation";
import Link from "next/link";
import LoadingBar from "react-top-loading-bar";
import { AddTherapyDetails, GetTherapySessions } from "../../components/api";

const TherapyDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [therapySessions, setTherapySessions] = useState<Array<any>>([]);
  const [upcomingTherapies, setUpcomingTherapies] = useState<Array<any>>([]);
  const [previousTherapies, setPreviousTherapies] = useState<Array<any>>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [childName, setChildName] = useState("");
  const [therapySession, setTherapySession] = useState("");
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

  const openDetailsDialog = () => setIsDetailsDialogOpen(true);
  const closeDetailsDialog = () => setIsDetailsDialogOpen(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      // Handle file upload
    }
  };
  const generateResult = () => {
    setIsLoading(true);
    let counter = 0;
    const intervalId = setInterval(() => {
      counter += 1;
      setProgress(counter);
      if (counter === 100) {
        clearInterval(intervalId);
        setIsLoading(false);
        setResult("JA = Most Effective, TT = Effective, IM = Least Effective");
      }
    }, 6000); // 6000 milliseconds * 100 iterations = 10 minutes
  };

  const handleAddTherapy = async () => {
    try {
      await AddTherapyDetails({
        childname: childName,
        therapynumber: parseInt(therapySession),
        date: selectedDate,
        time: selectedTime,
        userId: "sampleUserId", // Assuming userId is hardcoded for now
      });
      // Optionally, you can update the UI or perform any other actions upon successful addition of therapy details
      // Clear form fields and close dialog
      setChildName("");
      setTherapySession("");
      setSelectedDate("");
      setSelectedTime("");
      closeDialog();
    } catch (error) {
      console.error("Error adding therapy details:", error);
      // Handle error adding therapy details
    }
  };

  const today = new Date();
  const currentDate = today.toISOString().split("T")[0];
  let hours = today.getHours();
  let minutes: string | number = today.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const currentTime = hours + ":" + minutes + " " + ampm;

  useEffect(() => {
    const fetchTherapySessions = async () => {
      try {
        const response = await GetTherapySessions();
        console.log(response);
        setTherapySessions([...response.existingTherapyDetails]); // Assuming response is an array of therapy sessions
      } catch (error) {
        console.error("Error fetching therapy sessions:", error);
      }
    };

    fetchTherapySessions();
  }, []);

  useEffect(() => {
    // Filter therapy sessions based on their dates and times
    const now = new Date();
    const upcoming = therapySessions.filter((session) => {
      const sessionDateTime = new Date(session.date + "T" + session.time);
      return sessionDateTime >= now;
    });
    const previous = therapySessions.filter((session) => {
      const sessionDateTime = new Date(session.date + "T" + session.time);
      return sessionDateTime < now;
    });

    setUpcomingTherapies(upcoming);
    setPreviousTherapies(previous);
  }, [therapySessions]);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleChildNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChildName(event.target.value);
  };

  const handleTherapyNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTherapySession(event.target.value);
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
  };

  return (
    <>
      <div className="relative">
        {isLoading && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 z-50 flex items-center justify-center">
            <LoadingBar
              color="#f11946"
              progress={progress}
              onLoaderFinished={() => setProgress(0)}
            />
          </div>
        )}
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
              {/* Display upcoming therapies */}
              {upcomingTherapies.map((session, index) => (
                <div key={index} className="border-black border p-2 my-2">
                  {/* Display therapy session details */}
                  <p>Child Name: {session.childname}</p>
                  <p>Therapy Number: {session.therapynumber}</p>
                  <p>Date: {session.date}</p>
                  <p>Time: {session.time}</p>
                </div>
              ))}
            </div>
            <div className="w-1/2 px-2">
              {previousTherapies.map((session, index) => (
                <div
                  key={index}
                  className="border-black border p-2 my-2 flex justify-between items-center"
                >
                  <div>
                    {/* Display therapy session details */}
                    <p>Child Name: {session.childname}</p>
                    <p>Therapy Number: {session.therapynumber}</p>
                    <p>Date: {session.date}</p>
                    <p>Time: {session.time}</p>
                  </div>
                  <button
                    onClick={() => openDetailsDialog()}
                    className="px-4 py-2 rounded bg-transparent border-green-500 border text-black hover:bg-green-600"
                  >
                    Add Details
                  </button>
                </div>
              ))}
            </div>
          </div>
          {isDetailsDialogOpen && (
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
                  &#8203;
                </span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-lg leading-6 font-medium text-gray-900"
                          id="modal-title"
                        >
                          Add Details
                        </h3>
                        <div className="mt-2">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="therapy-type"
                          >
                            Therapy Type:
                            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                              <option value="RET">RET</option>
                              <option value="SHT">SHT</option>
                            </select>
                          </label>
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="ability"
                          >
                            Ability:
                            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                              <option value="JA">JA</option>
                              <option value="TT">TT</option>
                              <option value="IM">IM</option>
                            </select>
                          </label>
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="json-file"
                          >
                            Upload a JSON file:
                            <input
                              type="file"
                              accept=".json"
                              ref={fileInputRef}
                              onChange={handleFileUpload}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      onClick={generateResult}
                      className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 mt-4"
                    >
                      Generate Result
                    </button>
                    {!isLoading && result && (
                      <div className="mt-4 bg-white p-4 rounded-lg shadow-md w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-2">Results</h2>
                        <p>{result}</p>
                      </div>
                    )}
                    <button
                      onClick={closeDetailsDialog}
                      className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 mt-4"
                    >
                      Cancel
                    </button>
                    {/* Display the result */}
                  </div>
                </div>
              </div>
              {isLoading && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 z-50 flex items-center justify-center">
                  <LoadingBar
                    color="#f11946"
                    progress={progress}
                    onLoaderFinished={() => setProgress(0)}
                  />
                </div>
              )}
            </div>
          )}
          <button
            onClick={openDialog}
            className="px-4 py-2 rounded bg-transparent border-green-500 border text-black hover:bg-green-600 mt-4"
          >
            Add Upcoming Therapy
          </button>
          {/* Dialog for adding therapy */}
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
                            onChange={handleChildNameChange}
                          />
                          <input
                            type="text"
                            placeholder="Therapy Session"
                            className="w-full px-2 py-1 border rounded mt-2"
                            onChange={handleTherapyNumberChange}
                          />
                          <input
                            type="date"
                            placeholder="Therapy Date"
                            className="w-full px-2 py-1 border rounded mt-2"
                            min={currentDate}
                            value={selectedDate}
                            onChange={handleDateChange}
                          />
                          <input
                            type="time"
                            placeholder="Therapy Time"
                            className="w-full px-2 py-1 border rounded mt-2"
                            min={
                              selectedDate === currentDate
                                ? currentTime
                                : "00:00"
                            }
                            value={selectedTime}
                            onChange={handleTimeChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      onClick={handleAddTherapy} // Removed the arrow function
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
      </div>
    </>
  );
};

export default TherapyDetails;
