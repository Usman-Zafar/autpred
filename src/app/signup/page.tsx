"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/HomeNavigation";
import { AddUser } from "@/components/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    type: "",
  });

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
      const response = await AddUser({ ...formData });
      console.log("Signup response:", response);
    } catch (error) {
      console.error("Signup error:", error);
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
              Sign Up
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="w-full flex-col flex gap-y-2">
                <label className="text-lg font-bold">First Name</label>
                <input
                  type="firstname"
                  placeholder="First Name"
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus-active:border-green-500"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full flex-col flex gap-y-2">
                <label className="text-lg font-bold">Last Name</label>
                <input
                  type="lastname"
                  placeholder="Last Name"
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus-active:border-green-500"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
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
              <div className="w-full flex-col flex gap-y-2">
                <label className="text-lg font-bold">Type</label>
                <select
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus-active:border-green-500"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="">Select Type</option>
                  <option value="caregiver">Caregiver</option>
                  <option value="therapist">Therapist</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full px-4 mt-2 py-2 rounded bg-green-500 text-white hover:bg-green-600"
              >
                Sign Up
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Signup;
