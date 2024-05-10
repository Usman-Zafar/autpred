"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import TherapistNavbar from "@/components/TherapistNavigation";
import { AddProfile, GetProfiles } from "../../components/api";

const AddChildProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [childName, setChildName] = useState("");
  const [age, setAge] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [profiles, setProfiles] = useState<
    Array<{
      age: number;
      childname: string;
      parentemail: string;
      _id: string | number;
    }>
  >([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await GetProfiles();
      console.log(response);
      setProfiles([...response.existingProfiles]);
    };

    fetchProfiles();
  }, []);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleChildNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChildName(event.target.value);
  };

  const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.value);
  };

  const handleParentEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setParentEmail(event.target.value);
  };

  const handleAddProfile = async () => {
    try {
      await AddProfile({
        childname: childName,
        age: parseInt(age),
        parentemail: parentEmail,
        userId: "sampleUserId",
      });
      // Optionally, you can update the UI with the newly added profile here
      // Clear the form fields and close the dialog
      setChildName("");
      setAge("");
      setParentEmail("");
      closeDialog();
    } catch (error) {
      console.error("Error adding profile:", error);
      // Handle error adding the profile
    }
  };

  return (
    <>
      <TherapistNavbar />
      <div className="center-content flex flex-col items-center flex-1 mt-4 w-full">
        <div className="flex gap-x-2 w-full px-2 items-center justify-center h-full">
          <div className="w-full px-2">
            {/* Display already added children */}
            <button className="px-4 py-2 rounded bg-transparent w-full border-green-500 border text-black hover:bg-green-600">
              Added Profiles
            </button>
            {profiles.map((profile) => (
              <div key={profile._id} className="border p-2 my-2">
                <p>Child Name: {profile.childname}</p>
                <p>Age: {profile.age}</p>
                <p>Parent Email: {profile.parentemail}</p>
              </div>
            ))}
            <button
              onClick={openDialog}
              className="px-4 py-2 rounded bg-transparent border-green-500 border text-black hover:bg-green-600 mt-4"
            >
              Add Profile
            </button>
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
                        Add Profile
                      </h3>
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Child Name"
                          className="w-full px-2 py-1 border rounded"
                          value={childName}
                          onChange={handleChildNameChange}
                        />

                        <input
                          type="text"
                          placeholder="Age"
                          className="w-full px-2 py-1 border rounded mt-2"
                          value={age}
                          onChange={handleAgeChange}
                        />

                        <input
                          type="email"
                          placeholder="Parent Email"
                          className="w-full px-2 py-1 border rounded mt-2"
                          value={parentEmail}
                          onChange={handleParentEmailChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={handleAddProfile}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add Profile
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

export default AddChildProfile;
