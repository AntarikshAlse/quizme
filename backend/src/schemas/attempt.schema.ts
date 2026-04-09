// src/schemas/attempt.schema.ts

import { z } from "zod";

export const SubmitAttemptSchema = z.object({
  quizId: z.string().meta({
    description: "Quiz ID",
    example: "64f123abc",
  }),

  answers: z.array(
    z.object({
      questionId: z.string(),
      answer: z.union([z.string(), z.boolean()]),
    })
  ),
});