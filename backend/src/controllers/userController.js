import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import fetch from "node-fetch";
import { shuffle } from "../utils/ShuffleArray.js";
import { User } from "../models/userModel.js";

const userEmail = AsyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    console.log("email in backend:", email);

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
    const { email } = req.body;
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

    console.log("Fetched trivia questions:", data);

    const questions = data.results.map((question) => ({
      question: question.question,
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

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { questions: [...questions, { correctAnswer: null }] },
          "Questions fetched successfully"
        )
      );
  } catch (error) {
    console.error("Error fetching trivia questions:", error);
    res.status(500).json({ error: "Failed to fetch trivia questions" });
  }
});

export { userEmail, fetchQuestions };
