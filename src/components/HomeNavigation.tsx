"use client";
import { useState } from "react";
import { animated, useSpring } from "react-spring";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const props = useSpring({
    transform: isOpen ? `translate3d(0,0,0)` : `translate3d(-100%,0,0)`,
  });

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
              href="/services"
              className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
            >
              Our Services
            </Link>
            <Link
              href="/about"
              className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
            >
              About Us
            </Link>
            <Link
              href="/faqs"
              className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
            >
              FAQs
            </Link>
          </div>
          <div>
            <Link
              href="/register"
              className="block mt-4 md:inline-block md:mt-0 text-yellow-300 hover:text-yellow-500"
            >
              Login
            </Link>
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
            href="/services"
            className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
          >
            Our Services
          </Link>
          <Link
            href="/about"
            className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
          >
            About Us
          </Link>
          <Link
            href="/faqs"
            className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200 mr-4"
          >
            FAQs
          </Link>
        </div>
        <div className="absolute bottom-0 mb-4 px-5">
          <Link
            href="/register"
            className="block mt-4 md:inline-block md:mt-0 text-yellow-300 hover:text-yellow-500"
          >
            Login
          </Link>
        </div>
      </animated.div>
    </nav>
  );
}
