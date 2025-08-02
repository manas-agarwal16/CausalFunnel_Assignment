import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { formatTime } from "../helper/formatTime.js";
import { useNavigate } from "react-router-dom";
import API from "../helper/axiosInstance.js";

const TOTAL_QUESTIONS = 15;
const QUIZ_DURATION_SECONDS = 30 * 60; // 30 minutes

export default function QuizPage() {
  const navigate = useNavigate();

  // Get user email from Redux store
  const userEmail = useSelector((state) => state.user.email);

  // State to manage quiz data
  const [questions, setQuestions] = useState([]);

  // Current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visited, setVisited] = useState(new Set([0]));
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION_SECONDS);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const timerRef = useRef();

  // Fetch questions from backend and check if user email is set
  useEffect(() => {
    if (!userEmail) {
      navigate("/");
    }

    const fetchQuestions = async () => {
      try {
        const response = await API.get(`/fetch-questions/${userEmail}`);

        console.log("response.data.questions", response.data.data.questions);

        setQuestions(response.data.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        navigate("/");
      }
    };
    fetchQuestions();
  }, [userEmail, navigate]);

  // Start countdown timer
  useEffect(() => {
    if (isSubmitted) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isSubmitted]);

  // Mark question as visited on navigation
  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setVisited((prev) => new Set(prev).add(index));
  };

  // Handle option selection
  const selectOption = (optionIndex) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  // Submit quiz handler
  const handleSubmit = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    clearInterval(timerRef.current);

    // Call the Backend API to submit answers
  };

  // Green: Answered, Yellow: Visited but no answer, Gray: Not visited
  const getStatusColorClass = (index) => {
    if (answers.hasOwnProperty(index)) return "bg-green-500 dark:bg-green-600";
    if (visited.has(index)) return "bg-yellow-400 dark:bg-yellow-600";
    return "bg-gray-300 dark:bg-gray-700";
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 flex flex-col md:flex-row max-w-7xl mx-auto p-4 md:p-8">
        {/* Sidebar navigation and timer */}
        <aside className="w-full md:w-64 mb-6 md:mb-0 md:mr-8 flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white select-none">
            Questions
          </h2>
          {/* Questions navigation grid */}
          <div className="grid grid-cols-5 gap-3 w-full">
            {questions?.map((q, idx) => (
              <button
                key={q.id}
                type="button"
                onClick={() => goToQuestion(idx)}
                className={`w-10 h-10 rounded-md flex items-center justify-center font-semibold text-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400 transition
                ${getStatusColorClass(idx)}
                ${
                  idx === currentQuestionIndex
                    ? "ring-4 ring-indigo-600 dark:ring-cyan-400"
                    : ""
                }`}
                aria-label={`Question ${q.id} ${
                  answers.hasOwnProperty(idx)
                    ? "answered"
                    : visited.has(idx)
                    ? "visited"
                    : "not visited"
                }`}
              >
                {q.id}
              </button>
            ))}
          </div>

          {/* Timer Display */}
          <div className="mt-8 text-center">
            <span className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">
              Time Remaining
            </span>
            <div
              className={`text-3xl font-bold ${
                timeLeft <= 60
                  ? "text-red-600 dark:text-red-400"
                  : "text-indigo-700 dark:text-cyan-400"
              }`}
              aria-live="polite"
            >
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitted}
            className={`mt-8 w-full py-3 rounded font-semibold text-white transition
            ${
              isSubmitted
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 cursor-pointer"
            }`}
            aria-disabled={isSubmitted}
            aria-label="Submit Quiz"
          >
            {isSubmitted ? "Quiz Submitted" : "Submit Quiz"}
          </button>
        </aside>

        {/* Main question panel */}
        {questions?.length > 0 && questions[currentQuestionIndex] && (
          <main className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              {questions[currentQuestionIndex].question}
            </h3>

            <div className="flex flex-col space-y-4">
              {questions[currentQuestionIndex].options?.map((option, idx) => {
                const selectedAnswer = answers[currentQuestionIndex];
                const isSelected = selectedAnswer === idx;

                return (
                  <button
                    key={idx}
                    type="button"
                    className={`text-left py-3 px-4 border rounded-md text-gray-900 dark:text-white
              ${
                isSelected
                  ? "border-indigo-600 dark:border-cyan-400 bg-indigo-100 dark:bg-cyan-700/30"
                  : "border-gray-300 dark:border-gray-600"
              }
              hover:bg-indigo-50 dark:hover:bg-cyan-600/20 transition`}
                    onClick={() => selectOption(idx)}
                    disabled={isSubmitted}
                    aria-pressed={isSelected}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-auto flex justify-between pt-6">
              <button
                onClick={() => goToQuestion(currentQuestionIndex - 1)}
                disabled={currentQuestionIndex === 0}
                className={`px-5 py-3 rounded font-medium border
          ${
            currentQuestionIndex === 0
              ? "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-600 cursor-not-allowed"
              : "border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white dark:text-cyan-400 dark:hover:bg-cyan-400"
          } transition`}
              >
                Previous
              </button>
              <button
                onClick={() => goToQuestion(currentQuestionIndex + 1)}
                disabled={currentQuestionIndex === TOTAL_QUESTIONS - 1}
                className={`px-5 py-3 rounded font-medium border
          ${
            currentQuestionIndex === TOTAL_QUESTIONS - 1
              ? "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-600 cursor-not-allowed"
              : "border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white dark:text-cyan-400 dark:hover:bg-cyan-400"
          } transition`}
              >
                Next
              </button>
            </div>
          </main>
        )}
      </div>
    </>
  );
}
