import { Router } from "express";
import { createQuiz, getQuizzes, getQuizById } from "../controllers/quizController.js";

const router = Router();

router.post("/", createQuiz); // Admin
router.get("/", getQuizzes); // Public
router.get("/:id", getQuizById);

export default router;
