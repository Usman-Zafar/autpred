"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/HomeNavigation";
import { GetUser } from "@/components/api";
import { useRouter } from "next/navigation";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value as string,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try { 
      const response = await GetUser({ ...formData });
      if (response.type === "therapist") router.push("/therapistdashboard");
      else if (response.type === "caregiver")
        router.push("/caregiverdashboard");
    } catch (error) {
      console.error("Signin error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-1 flex-row bg-white w-full p-10">
        <div className="hidden md:flex flex-col flex-1 justify-center items-start">
          <h1 className="w-full text-left text-3xl font-bold mb-4">
            Did you know?
          </h1>
          <p className="text-lg font-normal">
            1 in 54 children in the United States has autism spectrum disorder.
            <br />
            Early intervention is essential for children with ASD. Early
            intervention programs can provide children with the support they
            need to reach their full potential.
          </p>
        </div>
        <main className="flex-1 flex justify-center items-center">
          <div className="flex-col space-y-4 justify-center items-center">
            <h1 className="text-2xl font-bold w-full text-center mb-8">
              Sign In
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="w-full flex-col flex gap-y-2">
                <label className="text-lg font-bold">Email</label>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus-active:border-green-500"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full flex-col flex gap-y-2">
                <label className="text-lg font-bold">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus-active:border-green-500"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full mt-2 px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
              >
                Login
              </button>
              <p className="text-center mt-4 flex gap-x-2 justify-center items-center">
                Are you new here?
                <Link href="/signup">
                  <span className="text-green-500 underline hover:text-green-700">
                    Sign Up
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Signin;
