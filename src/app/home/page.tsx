import Navbar from "../../components/HomeNavigation";
import Link from "next/link";
import HomeBackground from "../../../public/HomeBackground.png";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-200 flex-1 flex flex-col md:flex-row">
        <main className="p-10 flex-1 flex flex-col md:flex-row justify-center">
          <div className="flex flex-col justify-center items-center flex-1">
            <div className="w-full">
              <h1 className="text-center md:text-left text-4xl font-bold mb-4">
                Conquer The Challenges Of Autism With Us
              </h1>
              <p className="text-xl text-center md:text-left mb-8">
                Give your child best support to help them reach new milestones
              </p>
            </div>
            <div className="flex justify-center items-center w-full">
              <Link href="/register">
                <div className="w-fit bg-green-500 text-white px-6 py-2 rounded cursor-pointer ">
                  Get Started
                </div>
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-end flex-1 w-25">
            {/* Add your illustration here */}
            <Image src={HomeBackground} alt="Home Background" />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
