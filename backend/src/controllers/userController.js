import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import fetch from "node-fetch";
import { shuffle } from "../utils/ShuffleArray.js";
import { User } from "../models/userModel.js";
import { sendOTPThroughEmail } from "../utils/Mail.js";

const userEmail = AsyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json(new ApiResponse(409, {}, "User already exists"));
    }

    // Create a new user
    const newUser = await new User({ email });
    newUser.save();

    return res
      .status(201)
      .json(new ApiResponse(201, { email }, "User registered successfully"));
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

const fetchQuestions = AsyncHandler(async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ message: "User email is required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User email not found" });
    }

    const response = await fetch("https://opentdb.com/api.php?amount=15");
    const data = await response.json();

    const questions = data.results.map((question, index) => ({
      question: question.question,
      id: index + 1,
      options: shuffle([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
      correctAnswer: question.correct_answer,
    }));

    // Save questions to the user's quizQuestionsAndResponses
    await User.findOneAndUpdate(
      { email },
      { quizQuestionsAndResponses: questions }
    );

    // skip the correctAnswer field for frontend
    const questionsForFrontend = questions.map(
      ({ correctAnswer, ...rest }) => rest
    );

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { questions: questionsForFrontend },
          "Questions fetched successfully"
        )
      );
  } catch (error) {
    console.error("Error fetching trivia questions:", error);
    res.status(500).json({ error: "Failed to fetch trivia questions" });
  }
});

const submitQuiz = AsyncHandler(async (req, res) => {
  const { email, answers } = req.body;

  if (!email || !answers) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Email and answers are required"));
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json(new ApiResponse(404, {}, "User not found"));
  }

  // Save user's answers
  user.quizQuestionsAndResponses.forEach((q, idx) => {
    q.selectedAnswer = q.options[answers[idx]];
    q.isCorrect = q.correctAnswer === q.selectedAnswer;
  });

  // Calculate score
  const totalMarks = user.quizQuestionsAndResponses.reduce(
    (acc, q) => acc + (q.isCorrect ? 1 : 0),
    0
  );

  user.score = totalMarks;
  await user.save();


  await sendOTPThroughEmail(user.email, totalMarks);

  res
    .status(200)
    .json(
      new ApiResponse(200, { user, totalMarks }, "Quiz submitted successfully")
    );
});

const fetchQuizReport = AsyncHandler(async (req, res) => {
  try {
    const { email } = req.params;

    // Validate email
    if (!email) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Email is required"));
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(new ApiResponse(404, {}, "User not found"));
    }

    const quizReport = await User.findOne({ email });

    res
      .status(200)
      .json(
        new ApiResponse(200, { quizReport }, "Quiz report fetched successfully")
      );
  } catch (error) {
    console.error("Error fetching quiz report:", error);
    res.status(500).json({ error: "Failed to fetch quiz report" });
  }
});

export { userEmail, fetchQuestions, submitQuiz, fetchQuizReport };
