import express from "express";
import { userEmail, fetchQuestions } from "../controllers/userController.js";

const router = express.Router();

router.post("/user-email", userEmail);
router.get("/fetch-questions", fetchQuestions);


export default router;
