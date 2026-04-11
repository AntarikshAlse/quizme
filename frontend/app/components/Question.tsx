// components/Question.js
"use client";

import { useState, memo } from "react";
import { type Question } from "../quiz/[id]/page";

function Question({
  question,
  onAnswer,
}: {
  question: Question;
  onAnswer: (qid: string, value: string | boolean, type?: string) => void;
}) {
  const [value, setValue] = useState("");
  return (
    <div className="mb-4">
      <p className="font-medium">{question.questionText}</p>

      {question.type === "mcq" &&
        question.options &&
        question.options.map((opt, i) => (
          <label key={i} className="block">
            <input
              type="radio"
              name={question._id}
              onChange={() => onAnswer(question._id, opt)}
            />
            {opt}
          </label>
        ))}

      {question.type === "true_false" && (
        <>
          <label>
            <input
              type="radio"
              name={question._id}
              onChange={() => onAnswer(question._id, true)}
            />
            True
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name={question._id}
              onChange={() => onAnswer(question._id, false)}
            />
            False
          </label>
        </>
      )}

      {question.type === "text" && (
        <input
          type="text"
          className="border p-2 mt-2 w-full"
          onChange={(e) => setValue(e.target.value)}
          onBlur={(e) => onAnswer(question._id, e.target.value)}
        />
      )}
    </div>
  );
}

export default memo(Question);
