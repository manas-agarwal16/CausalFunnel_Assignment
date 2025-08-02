import express from "express";
import {
  userEmail,
  fetchQuestions,
  submitQuiz,
  fetchQuizReport,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/user-email", userEmail);
router.get("/fetch-questions/:email", fetchQuestions);
router.post("/submit-quiz", submitQuiz);
router.get("/quiz-report/:email", fetchQuizReport);
export default router;
