import React from "react";
import TherapistNavbar from "@/components/TherapistNavigation";
import Link from "next/link";

const therapistdashboard = () => {
  return (
    <>
      <TherapistNavbar />
      <div className="center-content flex flex-col flex-1 justify-center items-center">
        <h1 className="text-3xl font-bold text-center mb-4">Welcome User</h1>

        <div className="button-group flex flex-wrap justify-center gap-2">
        <Link href="/asd-screening">
          <button className="px-4 py-2 rounded bg-transparent border-green-500 border text-black hover:bg-green-600">
            ASD Screening
          </button>
        </Link>
        <Link href="/therapy-details">
          <button className="px-4 py-2 rounded bg-transparent border-green-500 border text-black hover:bg-green-600">
            Therapy Details
          </button>
        </Link>
        <Link href="/view-reports">
          <button className="px-4 py-2 rounded bg-transparent border-green-500 border text-black hover:bg-green-600">
            Monthly Report
          </button>
        </Link>
        </div>
      </div>
    </>
  );
};

export default therapistdashboard;
