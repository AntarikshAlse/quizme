// src/schemas/attempt.schema.ts

import { z } from "zod";

export const zObjectId = () =>
  z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId");

export const SubmitAttemptSchema = z.object({
  quizId: z.string().meta({
    description: "Quiz ID",
    example: "64f123abc",
  }),

  answers: z.array(
    z.object({
      questionId: zObjectId(),
      answer: z.union([z.string(), z.boolean()]),
    })
  ),
});