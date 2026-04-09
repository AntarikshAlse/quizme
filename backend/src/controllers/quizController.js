import { Quiz } from "../models/quiz.js";

// Create Quiz (Admin)
export const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Quizzes (Public)
export const getQuizzes = async (req, res) => {
  const quizzes = await Quiz.find({ isPublished: true });
  res.json(quizzes);
};

// Get Single Quiz
export const getQuizById = async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) return res.status(404).json({ msg: "Quiz not found" });

  res.json(quiz);
};
