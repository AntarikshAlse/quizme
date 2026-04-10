// app/quiz/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "@/app/lib/api";
import Question from "@/app/components/Question";
import { paths } from "@/app/types/api";

export type QuizRequestBody = paths["/api/quizzes"]["post"]["requestBody"]['content']['application/json'];
export type AttemptRequestBody = paths["/api/attempts/submit"]["post"]["requestBody"]['content']['application/json'];

export default function QuizPage() {
  const { id } = useParams();

  const [quiz, setQuiz] = useState<QuizRequestBody | null>(null);
  const [answers, setAnswers] = useState<AttemptRequestBody["answers"] | {}>({});
  const [result, setResult] = useState<Record <string, string> | null>(null);

  useEffect(() => {
    API.get(`/quizzes/${id}`).then((res) => setQuiz(res.data));
  }, [id]);

  const handleAnswer = (qid: string, value: string|boolean) => {
    setAnswers({ ...answers, [qid]: value });
  };

  const submitQuiz = async () => {

    const res = await API.post("/attempts/submit", {
      quizId: id,
      answers: answers,
    });

    setResult(res.data);
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">{quiz.title}</h1>

      {quiz.questions.map((q) => (
        <Question key={q.questionText} question={q} onAnswer={handleAnswer} />
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