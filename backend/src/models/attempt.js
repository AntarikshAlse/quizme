import { Schema, model } from "mongoose";

const answerSchema = new Schema({
  questionId: Schema.Types.ObjectId,
  answer: Schema.Types.Mixed,
  isCorrect: Boolean,
});

const attemptSchema = new Schema(
  {
    quizId: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    answers: [answerSchema],
    score: Number,
  },
  { timestamps: true },
);

export const Attempt = model("Attempt", attemptSchema);