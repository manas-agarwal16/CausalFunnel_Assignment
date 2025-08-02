import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatTime } from "../helper/formatTime.js";
import { useNavigate } from "react-router-dom";
import API from "../helper/axiosInstance.js";
import { setQuizSubmitted } from "../store/features/userSlice.js";
import BeginTimer from "./BeginTimer.jsx";
import SubmitButton from "./SubmitButton.jsx";
import Timer from "./Timer.jsx";
import QuestionPanel from "./QuestionPanel.jsx";


const QUIZ_DURATION_SECONDS = 30 * 60; // 30 minutes
const QUIZ_BEGIN_TIME = 5; // seconds

export default function QuizPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userEmail = useSelector((state) => state.user.email);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visited, setVisited] = useState(new Set([0]));
  const [mainTimeLeft, setMainTimeLeft] = useState(QUIZ_DURATION_SECONDS);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [beginCountdown, setBeginCountdown] = useState(QUIZ_BEGIN_TIME);
  const timerRef = useRef();
  const beginTimerRef = useRef();

  // Fetch questions and check email
  useEffect(() => {
    if (!userEmail) navigate("/");

    const fetchQuestions = async () => {
      try {
        const response = await API.get(`/fetch-questions/${userEmail}`);
        setQuestions(response.data.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        navigate("/");
      }
    };
    fetchQuestions();
  }, [userEmail, navigate]);

  // Begin countdown logic
  useEffect(() => {
    if (!questions.length) return;
    if (isSubmitted) return;
    if (beginCountdown <= 0) return;

    beginTimerRef.current = setInterval(() => {
      setBeginCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(beginTimerRef.current);
          setBeginCountdown(0); // End begin phase
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(beginTimerRef.current);
  }, [questions.length, isSubmitted, beginCountdown]);

  // Start main timer after begin phase
  useEffect(() => {
    if (isSubmitted) return;
    if (beginCountdown > 0) return;

    timerRef.current = setInterval(() => {
      setMainTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [beginCountdown, isSubmitted]);

  // Navigation
  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setVisited((prev) => new Set(prev).add(index));
  };

  // Option selection
  const selectOption = (optionIndex) => {
    if (isSubmitted || beginCountdown > 0) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  // Submit quiz
  const handleSubmit = async () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    clearInterval(timerRef.current);
    dispatch(setQuizSubmitted(true));
    await API.post("/submit-quiz", { email: userEmail, answers: answers });
    navigate("/report");
  };

  // Status box color
  const getStatusColorClass = (index) => {
    if (answers.hasOwnProperty(index)) return "bg-green-500 dark:bg-green-600";
    if (visited.has(index)) return "bg-yellow-400 dark:bg-yellow-600";
    return "bg-gray-300 dark:bg-gray-700";
  };

  // Render begin countdown overlay
  if (beginCountdown > 0 && questions.length > 0) {
    return <BeginTimer beginCountdown={beginCountdown} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 flex flex-col md:flex-row max-w-7xl mx-auto p-4 md:p-8">
      {/* Sidebar + timer */}
      <aside className="w-full md:w-64 mb-6 md:mb-0 md:mr-8 flex flex-col items-center md:items-start">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white select-none">
          Questions
        </h2>
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
              disabled={isSubmitted}
            >
              {q.id}
            </button>
          ))}
        </div>
        {/* Timer */}
        <Timer mainTimeLeft={mainTimeLeft} formatTime={formatTime} />

        {/* Submit */}
        <SubmitButton handleSubmit={handleSubmit} isSubmitted={isSubmitted} />
        
      </aside>

      {/* Main question panel */}
      {questions.length > 0 && questions[currentQuestionIndex] && (
        <QuestionPanel
          currentQuestionIndex={currentQuestionIndex}
          questions={questions}
          answers={answers}
          selectOption={selectOption}
          isSubmitted={isSubmitted}
          goToQuestion={goToQuestion}
        />
      )}
    </div>
  );
}
