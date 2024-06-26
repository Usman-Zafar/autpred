"use client";
import { useState, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

export default function TherapistNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const props = useSpring({
    transform: isOpen ? `translate3d(0,0,0)` : `translate3d(-100%,0,0)`,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/register";
  };

  return (
    <nav className="flex items-center justify-between p-5 bg-gray-500">
      <h1 className="text-white text-lg font-bold">
        <Link href="/home">AutPredict</Link>
      </h1>
      <div className="hidden md:block">
        <div
          className={`${
            isOpen ? "" : "hidden"
          } md:flex md:items-center md:w-auto w-full`}
          id="menu"
        >
          <div className="md:flex-grow">
            <Link
              href="/asd-screening"
              className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
            >
              ASD Screening
            </Link>
            <Link
              href="/therapy-details"
              className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
            >
              Therapy Details
            </Link>
            <Link
              href="/monthly-reports"
              className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
            >
              Generate Reports
            </Link>
            <Link
              href="/add-profile"
              className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
            >
              Add Profile
            </Link>
          </div>
          <div>
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="block mt-4 md:inline-block md:mt-0 text-yellow-300 hover:text-yellow-500"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/register"
                className="block mt-4 md:inline-block md:mt-0 text-yellow-300 hover:text-yellow-500"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu color="black" />
        </button>
      </div>
      <animated.div
        style={props}
        className={`${
          isOpen ? "" : "hidden"
        } md:hidden md:items-center md:w-auto w-full bg-black text-white h-screen fixed right-0 top-0 transform transition-transform duration-200 ease-in-out`}
        id="menu"
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-0 right-0 mt-4 mr-4 md:hidden"
        >
          X
        </button>
        <div className="md:flex-grow mt-12 px-5">
          <Link
            href="/asd-screening"
            className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
          >
            ASD Screening
          </Link>
          <Link
            href="/therapy-details"
            className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
          >
            Therapy Details
          </Link>
          <Link
            href="/monthly-reports"
            className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
          >
            Generate Reports
          </Link>
          {isAuthenticated ? (
            <div className="absolute bottom-0 mb-4">
              <button
                onClick={logout}
                className="block mt-4 md:inline-block md:mt-0 text-yellow-300 hover:text-yellow-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="absolute bottom-0 mb-4">
              <Link
                href="/register"
                className="block mt-4 md:inline-block md:mt-0  text-yellow-300 hover:text-yellow-500"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </animated.div>
    </nav>
  );
}
