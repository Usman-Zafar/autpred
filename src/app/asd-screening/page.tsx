"use client";
import React, { useState } from "react";

type ScreeningQuestion = {
  id: number;
  question: string;
  options: string[];
};

const ASDScreening: React.FC = () => {
  const [answers, setAnswers] = useState<string[]>([]);

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

  return (
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
    </div>
  );
};

export default ASDScreening;
