"use client";
import React, { useState, useEffect } from "react";
import CaregiverNavbar from "@/components/CaregiverNavigation";
import { GetResult } from "@/components/api";

const ViewReports = () => {
  const [childReport, setChildReport] = useState<any>(null); // State to store child report data
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await GetResult();
        setChildReport(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <CaregiverNavbar />
      <div className="center-content flex flex-col items-start flex-1 mt-4 w-full">
        <div className="w-full px-2">
          <button className="px-4 py-2 rounded bg-transparent w-full border-green-500 border text-black hover:bg-green-600">
            Child Report
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : childReport ? (
          <div className="flex flex-col items-start w-full px-2">
            <div className="border-black border w-full p-2 my-2">
              <p>Child Name: {childReport.childname}</p>
              {childReport.resultsearch.map((result: any, index: number) => (
                <div key={index} className="mt-2">
                  <p>Most Effective Therapy: {result.mosteffective}</p>
                  <p>
                    Second Most Effective Therapy: {result.secondmosteffective}
                  </p>
                  <p>Least Effective Therapy: {result.leastmosteffective}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="border-black border w-full p-2 my-2">
            No therapy data entered so far.
          </p>
        )}
      </div>
    </>
  );
};

export default ViewReports;
