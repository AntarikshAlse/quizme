import { Schema, model } from "mongoose";

const questionSchema = new Schema({
  questionText: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["mcq", "true_false", "text"],
    required: true,
  },
  options: [String], // only for MCQ
  correctAnswer: Schema.Types.Mixed,
  // string | boolean | text
});

const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);
export const Quiz = model("Quiz", quizSchema);
