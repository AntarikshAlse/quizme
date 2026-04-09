// src/schemas/quiz.schema.ts

import { z } from "zod";

export const QuestionSchema = z.object({
  questionText: z.string().min(1).meta({
    description: "The question text",
    example: "What is 2+2?",
  }),

  type: z.enum(["mcq", "true_false", "text"]).meta({
    description: "Question type",
    example: "mcq",
  }),

  options: z.array(z.string()).optional().meta({
    description: "Options for MCQ",
    example: ["1", "2", "3", "4"],
  }),

  correctAnswer: z.union([z.string(), z.boolean()]).meta({
    description: "Correct answer",
    example: "4",
  }),
});

export const QuizSchema = z.object({
  title: z.string().meta({
    description: "Quiz title",
    example: "Math Quiz",
  }),

  questions: z.array(QuestionSchema).min(1),
});

export type QuizInput = z.infer<typeof QuizSchema>;