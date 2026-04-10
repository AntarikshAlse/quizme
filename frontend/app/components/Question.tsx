// components/Question.js
"use client";

import { QuizRequestBody } from "../quiz/[id]/page";


export default function Question({ question, onAnswer }:{question: QuizRequestBody['questions'][0], onAnswer: (qid: string, value: string | boolean) => void}) {
  return (
    <div className="mb-4">
      <p className="font-medium">{question.questionText}</p>

      {question.type === "mcq" && question.options &&
        question.options.map((opt, i) => (
          <label key={i} className="block bg-red-200">
            <input
              type="radio"
              name={question.questionText}
              onChange={() => onAnswer(question.questionText, opt)}
            />
            {opt}
          </label>
        ))}

      {question.type === "true_false" && (
        <>
          <label>
            <input
              type="radio"
              name={question.questionText}
              onChange={() => onAnswer(question.questionText, true)}
            />
            True
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name={question.questionText}
              onChange={() => onAnswer(question.questionText, false)}
            />
            False
          </label>
        </>
      )}

      {question.type === "text" && (
        <input
          type="text"
          className="border p-2 mt-2 w-full"
          onChange={(e) => onAnswer(question.questionText, e.target.value)}
        />
      )}
    </div>
  );
}