"use client";
import { useState } from "react";
import HomeNavigation from "../../components/HomeNavigation";
import { RiArrowDropDownLine } from "react-icons/ri";

type Question = {
  id: number;
  question: string;
  answer: string;
};
function toggleExpandOrder(orderId: string) {
  const expandedContent = document.getElementById(orderId);
  const dropdownIcon = document.getElementById(`${orderId}-dropdown`);
  const dropdownContent = document.getElementById(`${orderId}-heading`);
  if (expandedContent?.classList.contains("max-h-0")) {
    expandedContent?.classList.remove("max-h-0");
    expandedContent?.classList.add("max-h-screen", "pt-2");
    dropdownIcon?.classList.remove("rotate-0");
    dropdownIcon?.classList.add("rotate-180");
    dropdownContent?.classList.remove(
      "overflow-hidden",
      "whitespace-nowrap",
      "text-ellipsis",
      "w-4/5"
    );
  } else {
    expandedContent?.classList.remove("max-h-screen");
    expandedContent?.classList.add("max-h-0", "pt-0");
    dropdownIcon?.classList.remove("rotate-180");
    dropdownIcon?.classList.add("rotate-0");
    dropdownContent?.classList.add(
      "overflow-hidden",
      "whitespace-nowrap",
      "text-ellipsis",
      "w-4/5"
    );
  }
}
const Faq = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      question: "What is autism?",
      answer:
        "Autism, or autism spectrum disorder (ASD), refers to a broad range of conditions characterized by challenges with social skills, repetitive behaviors, speech and nonverbal communication.",
    },
    {
      id: 2,
      question: "What are some symptoms of autism?",
      answer:
        "Symptoms of autism include difficulty with communication and interaction with other people, restricted interests and repetitive behaviors.",
    },
    {
      id: 3,
      question: "What is Autistic Disorder?",
      answer:
        "Autistic Disorder, also known as classic autism, is the most severe form of ASD. Individuals with this disorder have significant impairments in social interaction and communication, along with highly repetitive behaviors and interests.",
    },
    {
      id: 4,
      question: "What is Asperger's Syndrome?",
      answer:
        "Asperger's Syndrome is a milder variant of Autistic Disorder. Individuals with Asperger's Syndrome have difficulties in social interaction and exhibit a restricted range of interests and/or repetitive behaviors",
    },
    {
      id: 5,
      question:
        "What are the other Autism Spectrum Disorders (ASDs) besides Autism and Asperger's Syndrome?",
      answer:
        "Other ASDs include Rett Syndrome, Childhood Disintegrative Disorder, and Pervasive Developmental Disorder Not Otherwise Specified (PDD-NOS)",
    },
    {
      id: 6,
      question: "What is Rett Syndrome?",
      answer:
        "Rett Syndrome is a rare genetic disorder that primarily affects girls. It is characterized by normal early growth and development followed by a slowing of development, loss of purposeful use of the hands, and distinctive hand movements.",
    },
    {
      id: 7,
      question: "Who develops Autism Spectrum Disorders (ASDs)?",
      answer:
        "ASDs can develop in individuals of all ethnic, racial, and economic backgrounds. However, it is four times more common in boys than in girls.",
    },
    {
      id: 8,
      question: "How are ASDs diagnosed?",
      answer:
        "ASDs are diagnosed based on the presence of impairments in social interaction and communication and the presence of restricted and repetitive behaviors",
    },
    {
      id: 9,
      question: "What are the causes of Autism Spectrum Disorders (ASDs)?",
      answer:
        "The exact cause of ASDs is unknown, but it is believed to be a combination of genetic and environmental factors.",
    },
    {
      id: 10,
      question: "How are ASDs treated?",
      answer:
        "There is no cure for ASDs, but there are various interventions that can help individuals manage their symptoms. These include behavioral therapy, speech and occupational therapy, and certain medications",
    },
  ];

  return (
    <>
      <HomeNavigation />
      <div className="flex flex-col gap-y-4 px-10 py-10 w-full justify-center items-center">
        <h1 className="text-4xl font-bold py-2">FAQs</h1>
        {questions.map((q) => (
          <div
            key={q.id}
            className="p-5 bg-white flex flex-col w-full text-left rounded-lg shadow-md"
          >
            <h2
              onClick={() => toggleExpandOrder(q!.id.toString())}
              className="flex w-full justify-between items-center cursor-pointer"
            >
              <span
                id={`${q!.id.toString()}-heading`}
                className="w-4/5 overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {q.question}
              </span>
              <RiArrowDropDownLine
                color="black"
                size={25}
                className="transition-transform transform duration-1000 rotate-0"
                id={`${q!.id.toString()}-dropdown`}
              />
            </h2>
            <div
              className={`max-h-0 overflow-hidden transition-max-height duration-1000`}
              id={q!.id.toString()}
            >
              <p>{q.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Faq;
