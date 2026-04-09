import { Router } from "express";
import { submitQuiz } from "../controllers/attemptController.js";
const router = Router();

router.post("/submit", submitQuiz);

export default router;