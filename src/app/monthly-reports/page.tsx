"use client";
import React, { useState, useEffect } from "react";
import TherapistNavbar from "@/components/TherapistNavigation";
import { GetProfiles, ChildResult } from "@/components/api";
import axios from "axios";

const MonthlyReport = () => {
  const [profiles, setProfiles] = useState<
    Array<{
      age: number;
      childname: string;
      parentemail: string;
      numberoftherapies: number;
      _id: string | number;
    }>
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mostEffective, setMostEffective] = useState("");
  const [secondMostEffective, setSecondMostEffective] = useState("");
  const [leastEffective, setLeastEffective] = useState("");
  const [selectedProfileId, setSelectedProfileId] = useState("");

  const openDialog = (profileId: string | number) => {
    setIsOpen(true);
    setSelectedProfileId(String(profileId)); 
  };
  const closeDialog = () => setIsOpen(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoading(true);
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    try {
      const formData = new FormData();
      formData.append("zip_file", file);
      const uploadResponse = await axios.post(
        "http://localhost:8000/upload_folder",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (uploadResponse.status === 200) {
        const predictResponse = await axios.post(
          "http://localhost:8000/predict_module_2"
        );
        if (predictResponse.status === 200) {
          const { prediction } = predictResponse.data;

          const maxIm = prediction.sht_im_predictions
            ? Math.max(...prediction.sht_im_predictions.flat())
            : 0;
          const maxTt = prediction.sht_tt_prediction
            ? Math.max(...prediction.sht_tt_prediction.flat())
            : 0;
          const maxJa = prediction.sht_ja_predictions
            ? Math.max(...prediction.sht_ja_predictions.flat())
            : 0;

          let mostEffective = "";
          if (maxIm >= maxTt && maxIm >= maxJa) {
            mostEffective = "IM";
          } else if (maxTt >= maxIm && maxTt >= maxJa) {
            mostEffective = "TT";
          } else {
            mostEffective = "JA";
          }

          let secondMostEffective = "";
          if (
            (maxIm >= maxTt && maxIm <= maxJa) ||
            (maxIm <= maxTt && maxIm >= maxJa)
          ) {
            secondMostEffective = "IM";
          } else if (
            (maxTt >= maxIm && maxTt <= maxJa) ||
            (maxTt <= maxIm && maxTt >= maxJa)
          ) {
            secondMostEffective = "TT";
          } else {
            secondMostEffective = "JA";
          }

          let leastEffective = "";
          if (maxIm <= maxTt && maxIm <= maxJa) {
            leastEffective = "IM";
          } else if (maxTt <= maxIm && maxTt <= maxJa) {
            leastEffective = "TT";
          } else {
            leastEffective = "JA";
          }

          setMostEffective(mostEffective);
          setSecondMostEffective(secondMostEffective);
          setLeastEffective(leastEffective);
        } else {
          console.error("Failed to get prediction");
        }
      } else {
        console.error("Failed to upload folder");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setDialogOpen(true);
    try{
      await ChildResult(mostEffective, secondMostEffective, leastEffective, selectedProfileId)
    }catch(error) {
      console.log("Adding Result Error")
    }
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await GetProfiles();
      setProfiles([...response.existingProfiles]);
    };

    fetchProfiles();
  }, []);

  return (
    <>
      <TherapistNavbar />
      <div className="center-content flex flex-col items-center flex-1 mt-4 w-full">
        <div className="flex gap-x-2 w-full px-2 items-center justify-center h-full">
          <div className="w-full px-2">
            <button className="px-4 py-2 rounded bg-transparent w-full border-green-500 border text-black hover:bg-green-600">
              Added Profiles
            </button>
            {profiles.map((profile) => (
              <div key={profile._id} className="border-black border p-2 my-2">
                <p>Child Name: {profile.childname}</p>
                <p>Age: {profile.age}</p>
                <p>Parent Email: {profile.parentemail}</p>
                <p>Number of Therapies: {profile.numberoftherapies}</p>
                <button
                  onClick={() => openDialog(profile._id)}
                  className="px-4 py-2 rounded bg-transparent border-green-500 border text-black hover:bg-green-600 mt-4"
                >
                  Upload Therapy Sessions
                </button>
              </div>
            ))}
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
                        Upload Therapy Sessions
                      </h3>
                      <div className="mt-2">
                        <input
                          type="file"
                          multiple
                          accept=".zip"
                          className="w-full px-2 py-1 border rounded"
                          onChange={handleFileUpload}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={closeDialog}
                    disabled={loading}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {dialogOpen && (
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
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Activity Effectiveness
                  </h3>
                  <div className="mt-4">
                    <p>Most Effective Activity: {mostEffective}</p>
                    <p>Second Most Effective Activity: {secondMostEffective}</p>
                    <p>Least Effective Activity: {leastEffective}</p>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={() => setDialogOpen(false)}
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
                  >
                    Close
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

export default MonthlyReport;
