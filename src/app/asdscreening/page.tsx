"use client";
import React, { useState } from "react";
import CaregiverNavbar from "@/components/CaregiverNavigation";

type ScreeningQuestion = {
  id: number;
  question: string;
  options: string[];
};

const ASDScreening: React.FC = () => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState("");

  const questions: ScreeningQuestion[] = [
    {
      id: 1,
      question: "Does your child look at you when you call his/her name?",
      options: ["Always", "Usually", "Sometimes", "Rarely", "Never"],
    },
    {
      id: 2,
      question: "How easy is it for you to get eye contact with your child?",
      options: ["Always", "Usually", "Sometimes", "Rarely", "Never"],
    },
    {
      id: 3,
      question:
        "Does your child point to indicate that s/he wants something? (e.g., a toy that is out of reach)",
      options: ["Always", "Usually", "Sometimes", "Rarely", "Never"],
    },
    {
      id: 4,
      question:
        "Does your child point to share interest with you? (e.g., pointing at an interesing sight)",
      options: ["Always", "Usually", "Sometimes", "Rarely", "Never"],
    },
    {
      id: 5,
      question:
        "Does your child pretend? (e.g., care for dolls, talk on a toy phone)",
      options: ["Always", "Usually", "Sometimes", "Rarely", "Never"],
    },
    {
      id: 6,
      question: "Does your child follow where you’re looking?",
      options: ["Always", "Usually", "Sometimes", "Rarely", "Never"],
    },
    {
      id: 7,
      question:
        "If you or someone else in the family is visibly upset, does your child show signs of wanting to comfort them? (e.g., stroking hair, hugging them)",
      options: ["Always", "Usually", "Sometimes", "Rarely", "Never"],
    },
    {
      id: 8,
      question: "Would you describe your child’s first words as:",
      options: ["Always", "Usually", "Sometimes", "Rarely", "Never"],
    },
    {
      id: 9,
      question: "Does your child use simple gestures? (e.g., wave goodbye)",
      options: ["Always", "Usually", "Sometimes", "Rarely", "Never"],
    },
    {
      id: 10,
      question: "Does your child stare at nothing with no apparent purpose?",
      options: ["Always", "Usually", "Sometimes", "Rarely", "Never"],
    },
  ];

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionId - 1] = answer;
      return updatedAnswers;
    });
  };

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < 9; i++) {
      if (["Sometimes", "Rarely", "Never"].includes(answers[i])) {
        score += 1;
      }
    }
    if (["Always", "Usually", "Sometimes"].includes(answers[9])) {
      score += 1;
    }
    return score;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    if (score > 3) {
      setResult("There are potential ASD traits observed.");
    } else {
      setResult("No ASD traits are observed.");
    }
    setIsOpen(true);
  };

  return (
    <>
      <CaregiverNavbar />
      <div className="flex flex-col gap-y-4 px-10 py-10 w-full justify-center items-center">
        <h1 className="text-4xl font-bold py-2">ASD Screening</h1>
        {questions.map((q) => (
          <div key={q.id} className="p-5 bg-white w-full rounded-lg shadow-md">
            <h2 className="text-left mb-4">{q.question}</h2>
            <div className="flex flex-wrap justify-between items-center">
              {q.options.map((option, index) => (
                <label
                  key={index}
                  className="inline-flex items-center mb-2 w-full sm:w-auto"
                >
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={option}
                    onChange={() => handleAnswerChange(q.id, option)}
                    className="form-radio h-5 w-5 text-indigo-600"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded bg-transparent border-green-500 border text-black hover:bg-green-600"
        >
          Submit
        </button>
        {isOpen && (
          <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                ​
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        ASD Screening Result
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{result}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ASDScreening;
