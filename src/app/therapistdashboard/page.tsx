"use client";
import React, { useState, useEffect } from "react";
import TherapistNavbar from "@/components/TherapistNavigation";
import Link from "next/link";
import Image from "next/image";
import Graph from "../../../public/Graph.png";
import { GetTherapySessions } from "../../components/api";

const TherapistDashboard = () => {
  const [upcomingTherapies, setUpcomingTherapies] = useState<Array<any>>([]);
  const [therapySessions, setTherapySessions] = useState<Array<any>>([]);
  useEffect(() => {
    const fetchTherapySessions = async () => {
      try {
        const response = await GetTherapySessions();
        setTherapySessions([...response.existingTherapyDetails]);
        // Filter upcoming therapies
        const now = new Date();
        const upcoming = therapySessions.filter((session) => {
          const sessionDateTime = new Date(session.date + "T" + session.time);
          return sessionDateTime >= now;
        });
        setUpcomingTherapies(upcoming);
      } catch (error) {
        console.error("Error fetching therapy sessions:", error);
      }
    };

    fetchTherapySessions();
  });

  return (
    <>
      <TherapistNavbar />
      <div className="center-content flex flex-col items-center flex-1 mt-4 w-full">
        <div className="flex justify-center items-center gap-x-2 w-full px-2">
          <Link href="/asd-screening" className="w-1/3">
            <button className="px-4 py-2 rounded bg-transparent w-full border-green-500 border text-black hover:bg-green-600">
              ASD Screening
            </button>
          </Link>
          <Link href="/therapy-details" className="w-1/3">
            <button className="px-4 py-2 rounded bg-transparent w-full border-green-500 border text-black hover:bg-green-600">
              Therapy Details
            </button>
          </Link>
          <Link href="/monthly-reports" className="w-1/3">
            <button className="px-4 py-2 rounded bg-transparent w-full border-green-500 border text-black hover:bg-green-600">
              Monthly Report
            </button>
          </Link>
        </div>
        <div className="flex gap-x-2 w-full px-2">
          <div className="w-1/3 px-2">
            <p className=" bg-white flex flex-col w-full text-left rounded-lg shadow-md p-2 my-2">
              Does your child look at you when you call his/her name?
            </p>
            <p className=" bg-white flex flex-col w-full text-left rounded-lg shadow-md p-2 my-2">
              How easy is it for you to get eye contact with your child?{" "}
            </p>
            <p className=" bg-white flex flex-col w-full text-left rounded-lg shadow-md p-2 my-2">
              Does your child point to indicate that s/he wants something?
              (e.g., a toy that is out of reach){" "}
            </p>
            <p className=" bg-white flex flex-col w-full text-left rounded-lg shadow-md p-2 my-2">
              Does your child point to share interest with you? (e.g., pointing
              at an interesing sight){" "}
            </p>
            <p className=" bg-white flex flex-col w-full text-left rounded-lg shadow-md p-2 my-2">
              Does your child pretend? (e.g., care for dolls, talk on a toy
              phone){" "}
            </p>
            <p className=" bg-white flex flex-col w-full text-left rounded-lg shadow-md p-2 my-2">
              Does your child follow where you’re looking?{" "}
            </p>
            <p className=" bg-white flex flex-col w-full text-left rounded-lg shadow-md p-2 my-2">
              If you or someone else in the family is visibly upset, does your
              child show signs. of wanting to comfort them? (e.g., stroking
              hair, hugging them)
            </p>
            <p className=" bg-white flex flex-col w-full text-left rounded-lg shadow-md p-2 my-2">
              Would you describe your child’s first words as:
            </p>
            <p className=" bg-white flex flex-col w-full text-left rounded-lg shadow-md p-2 my-2">
              Does your child use simple gestures? (e.g., wave goodbye)
            </p>
            <p className=" bg-white flex flex-col w-full text-left rounded-lg shadow-md p-2 my-2">
              Does your child stare at nothing with no apparent purpose?
            </p>
          </div>
          <div className="w-1/3 px-2">
            {upcomingTherapies.map((session, index) => (
              <div
                key={index}
                className="bg-white flex flex-col w-full text-left rounded-lg shadow-md p-2 my-2"
              >
                <p>
                  <b>Child Name:</b> {session.childname}
                </p>
                <p>
                  <b>Therapy Session:</b> {session.therapysession}
                </p>
                <p>
                  <b>Therapy Date:</b> {session.date}
                </p>
              </div>
            ))}
          </div>
          <div className="w-1/3 px-2">
            <Image src={Graph} alt="Graph" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TherapistDashboard;
