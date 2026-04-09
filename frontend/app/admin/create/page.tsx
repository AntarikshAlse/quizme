// app/admin/create/page.tsx
"use client";

import { useState } from "react";
import API from "@/app/lib/api";
import { useRouter } from "next/navigation";

/* ================= TYPES ================= */

type QuestionType = "mcq" | "true_false" | "text";

interface Question {
  questionText: string;
  type: QuestionType;
  options: string[];
  correctAnswer: string | boolean;
}

/* ================= COMPONENT ================= */

export default function CreateQuiz() {
    const router = useRouter()
  const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);

  /* ================= HANDLERS ================= */

  const addQuestion = () => {
    const newQuestion: Question = {
      questionText: "",
      type: "mcq",
      options: ["", "", "", ""],
      correctAnswer: "",
    };

    setQuestions((prev) => [...prev, newQuestion]);
  };

  const updateQuestion = (
    index: number,
    field: keyof Question,
    value: any
  ) => {
    const updated = [...questions];
    (updated[index] as any)[field] = value;
    setQuestions(updated);
  };

  const updateOption = (
    qIndex: number,
    optIndex: number,
    value: string
  ) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  /* ================= VALIDATION ================= */

  const validate = (): boolean => {
    if (!title.trim()) {
      alert("Title required");
      return false;
    }

    for (const q of questions) {
      if (!q.questionText.trim()) {
        alert("All questions need text");
        return false;
      }

      if (q.type === "mcq") {
        if (q.options.length !== 4 || q.options.some((o) => !o.trim())) {
          alert("MCQ must have 4 filled options");
          return false;
        }
        if (!q.correctAnswer) {
          alert("Select correct MCQ answer");
          return false;
        }
      }

      if (q.type === "true_false") {
        if (typeof q.correctAnswer !== "boolean") {
          alert("Select True/False answer");
          return false;
        }
      }

      if (q.type === "text") {
        if (!q.correctAnswer || typeof q.correctAnswer !== "string") {
          alert("Provide correct text answer");
          return false;
        }
      }
    }

    return true;
  };

  /* ================= SUBMIT ================= */

  const submitQuiz = async () => {
    if (!validate()) return;

    try {
      await API.post("/quizzes", { title, questions });
      alert("Quiz Created!");
      setTitle("");
      setQuestions([]);
      // navigate to home
      router.push("/")
    } catch (err) {
      console.error(err);
      alert("Error creating quiz");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>

      {/* TITLE */}
      <input
        placeholder="Quiz Title"
        className="border p-2 mb-4 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* QUESTIONS */}
      {questions.map((q, i) => (
        <div key={i} className="border p-4 mb-4 rounded">
          {/* Question text */}
          <input
            placeholder="Question"
            className="border p-2 w-full mb-2"
            value={q.questionText}
            onChange={(e) =>
              updateQuestion(i, "questionText", e.target.value)
            }
          />

          {/* Type */}
          <select
            className="border p-2 mb-2"
            value={q.type}
            onChange={(e) =>
              updateQuestion(i, "type", e.target.value as QuestionType)
            }
          >
            <option value="mcq">MCQ</option>
            <option value="true_false">True/False</option>
            <option value="text">Text</option>
          </select>

          {/* MCQ */}
          {q.type === "mcq" && (
            <div>
              <p className="font-medium">Options:</p>

              {q.options.map((opt, optIndex) => (
                <div key={optIndex} className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name={`correct-${i}`}
                    checked={q.correctAnswer === opt}
                    onChange={() =>
                      updateQuestion(i, "correctAnswer", opt)
                    }
                  />

                  <input
                    placeholder={`Option ${optIndex + 1}`}
                    className="border p-1 w-full"
                    value={opt}
                    onChange={(e) =>
                      updateOption(i, optIndex, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          )}

          {/* TRUE/FALSE */}
          {q.type === "true_false" && (
            <div className="mt-2">
              <label className="mr-4">
                <input
                  type="radio"
                  name={`tf-${i}`}
                  checked={q.correctAnswer === true}
                  onChange={() =>
                    updateQuestion(i, "correctAnswer", true)
                  }
                />
                True
              </label>

              <label>
                <input
                  type="radio"
                  name={`tf-${i}`}
                  checked={q.correctAnswer === false}
                  onChange={() =>
                    updateQuestion(i, "correctAnswer", false)
                  }
                />
                False
              </label>
            </div>
          )}

          {/* TEXT */}
          {q.type === "text" && (
            <input
              placeholder="Correct Answer"
              className="border p-2 w-full mt-2"
              value={typeof q.correctAnswer === "string" ? q.correctAnswer : ""}
              onChange={(e) =>
                updateQuestion(i, "correctAnswer", e.target.value)
              }
            />
          )}
        </div>
      ))}

      {/* ACTIONS */}
      <button
        onClick={addQuestion}
        className="bg-gray-500 text-white px-3 py-2 mr-2 rounded"
      >
        Add Question
      </button>

      <button
        onClick={submitQuiz}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Quiz
      </button>
    </div>
  );
}