// app/quiz/[id]/page.js
"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "@/app/lib/api";
import Question from "@/app/components/Question";
import { paths } from "@/app/types/api";
import { notFound } from "next/navigation";

export type Question = {
  _id: string;
  questionText: string;
  type: "true_false" | "mcq" | "text";
  options: [] | string[];
  correctAnswer: "true" | "false" | string;
};
export interface QuizResponseBody extends Question {
  _id: string;
  title: string;
  questions: Question[];
  isPublished: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
export type AttemptRequestBody =
  paths["/api/attempts/submit"]["post"]["requestBody"]["content"]["application/json"];

export default function QuizPage() {
  const { id } = useParams();

  const [quiz, setQuiz] = useState<QuizResponseBody | null>(null);
  const [answers, setAnswers] = useState<AttemptRequestBody["answers"] | {}>(
    {},
  );
  const [result, setResult] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    API.get(`/quizzes/${id}`).then((res) => setQuiz(res.data));
  }, [id]);

  const handleAnswer = useCallback((qid: string, value: string | boolean) => {
    // expensive oprations when used array O(n) *2  - first find(), then map()
    // for update hence used object for o(1), and to avoid rerenders
    setAnswers((prev) => ({
      ...prev,
      [qid]: value,
    }));
  }, []);

  const submitQuiz = async () => {
    const formattedAnswers = Object.entries(answers).map(
      ([questionId, answer]) => ({
        questionId,
        answer,
      }),
    );
    const res = await API.post("/attempts/submit", {
      quizId: id,
      answers: formattedAnswers,
    });

    setResult(res.data);
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">{quiz.title}</h1>

      {quiz.questions.map((q) => (
        <Question key={q._id} question={q} onAnswer={handleAnswer} />
      ))}

      <button
        onClick={submitQuiz}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>

      {result && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="font-bold">
            Score: {result.score} / {result.total}
          </h2>
        </div>
      )}
    </div>
  );
}
