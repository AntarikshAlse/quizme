"use client";

import Link from "next/link";

export default function QuizCard({ quiz }) {
  return (
    <div className="border p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold">{quiz.title}</h2>

      <Link
        href={`/quiz/${quiz._id}`}
        className="text-blue-500 mt-2 inline-block"
      >
        Take Quiz →
      </Link>
    </div>
  );
}