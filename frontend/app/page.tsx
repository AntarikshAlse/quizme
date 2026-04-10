"use client";

import { useEffect, useState } from "react";
import API from "./lib/api";
import QuizCard from "./components/QuizCard";
import { paths, components } from "@/app/types/api";

export type Quiz = paths["/api/quizzes"]["get"]["responses"]["200"]["content"]["application/json"];

export default function Home() {
  const [quizzes, setQuizzes] = useState<Quiz>([]);

  useEffect(() => {
    API.get("/quizzes").then((res) => setQuizzes(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>

      {quizzes.length > 0 && (
        <div className="grid gap-4">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.title} quiz={quiz} />
          ))}
        </div>
      ) || (
        <p className="text-center text-lg">No quizzes available</p>
      )}
    </div>
  );
}