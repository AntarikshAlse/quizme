// components/Question.js
"use client";

export default function Question({ question, onAnswer }) {
  return (
    <div className="mb-4">
      <p className="font-medium">{question.questionText}</p>

      {question.type === "mcq" &&
        question.options.map((opt, i) => (
          <label key={i} className="block bg-red-200">
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
          onChange={(e) => onAnswer(question._id, e.target.value)}
        />
      )}
    </div>
  );
}