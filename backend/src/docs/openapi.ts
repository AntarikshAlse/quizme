// src/docs/openapi.ts

import { createDocument } from "zod-openapi";
import { QuizSchema } from "../schemas/quiz.schema.ts";
import { SubmitAttemptSchema } from "../schemas/attempt.schema.ts";
import fs from "fs";

// IMPORTANT: import once for type support
import "zod-openapi";

const doc = createDocument({
  openapi: "3.1.0",
  info: {
    title: "Quiz API",
    version: "1.0.0",
  },

  paths: {
    "/api/quizzes": {
      get: {
        summary: "Get all quizzes",
        responses: {
          "200": {
            description: "List of quizzes",
            content: {
              "application/json": {
                schema: QuizSchema.array(),
              },
            },
          },
        },
      },

      post: {
        summary: "Create quiz",
        requestBody: {
          content: {
            "application/json": {
              schema: QuizSchema,
            },
          },
        },
        responses: {
          "201": {
            description: "Quiz created",
          },
        },
      },
    },

    "/api/attempts/submit": {
      post: {
        summary: "Submit quiz",
        requestBody: {
          content: {
            "application/json": {
              schema: SubmitAttemptSchema,
            },
          },
        },
        responses: {
          "200": {
            description: "Result",
          },
        },
      },
    },
  },
});

fs.writeFileSync(
  "./src/docs/openapi.json",
  JSON.stringify(doc, null, 2)
);

console.log("✅ OpenAPI generated");