import React, { FC } from "react";
import HomeNavigation from "../../components/HomeNavigation";
import Image from "next/image";
import Usman from "../../../public/Usman.jpg";
import Ali from "../../../public/Ali.jpg";
import { memberType } from "@/types";

const TeamCard: FC<{ member: memberType }> = ({ member }) => {
  return (
    <div className="w-1/2 flex flex-col justify-center items-center gap-y-2">
      <div className="w-full h-[250px] md:h-[500px] relative overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-contain"
        />
      </div>
      <h2>{member.name}</h2>
      <p>{member.position}</p>
    </div>
  );
};

const AboutUs = () => {
  const team = [
    {
      id: 1,
      name: "Ali Aftab",
      position: "Data Scientist and Web Developer",
      image: Ali,
    },
    {
      id: 2,
      name: "Mohammad Usman Zafar",
      position: "ML Engineer and Web Developer",
      image: Usman,
    },
  ];
  return (
    <>
      <HomeNavigation />
      <div className="m-10 gap-y-4 px-2 content-center">
        <h1 className="text-4xl font-bold text-center md:text-justify">
          Empowering Therapists to Help Children with Autism Reach Their Full
          Potential
        </h1>
        <h2 className="text-2xl mt-2 content-center text-center">
          Using advanced AI to personalize therapy and improve outcomes
        </h2>
        <h2 className="mt-10 text-2xl text-center font-bold">Our Vision </h2>
        <h3 className="text-center text-2xl">
          Transforming autism therapy through the power of AI and personalized
          care. Building a brighter future for children with autism, one
          data-driven treatment plan at a time. Empowering therapists and
          families to unlock the full potential of every child on the autism
          spectrum.
        </h3>
        <h2 className="mt-10 text-2xl text-center font-bold mb-8">Our Team</h2>
        <div className="flex flex-col items-center md:flex-row gap-x-4 w-full">
          {team.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutUs;
