import { Quiz } from "../models/quiz.js";
import { Attempt } from "../models/attempt.js";

export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ msg: "Quiz not found" });

    let score = 0;

    const evaluatedAnswers = answers.map((ans) => {
      const question = quiz.questions.id(ans.questionId);

      let isCorrect = false;

      if (question.type === "mcq" || question.type === "text") {
        isCorrect = question.correctAnswer === ans.answer;
      }

      if (question.type === "true_false") {
        isCorrect = question.correctAnswer === ans.answer;
      }

      if (isCorrect) score++;

      return {
        questionId: ans.questionId,
        answer: ans.answer,
        isCorrect,
      };
    });

    const attempt = await Attempt.create({
      quizId,
      answers: evaluatedAnswers,
      score,
    });

    res.json({
      score,
      total: quiz.questions.length,
      answers: evaluatedAnswers,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
