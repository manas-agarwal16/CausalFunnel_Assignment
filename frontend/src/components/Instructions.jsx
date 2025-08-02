import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function InstructionsPage() {
  const [accepted, setAccepted] = useState(false);
  const userEmail = useSelector((state) => state.user.email);
  const navigate = useNavigate();

  // full screen
  const requestFullscreen = () => {
    const doc = document.documentElement;

    if (doc.requestFullscreen) {
      doc.requestFullscreen();
    } else if (doc.mozRequestFullScreen) {
      // Firefox
      doc.mozRequestFullScreen();
    } else if (doc.webkitRequestFullscreen) {
      // Chrome, Safari, and Opera
      doc.webkitRequestFullscreen();
    } else if (doc.msRequestFullscreen) {
      // IE/Edge
      doc.msRequestFullscreen();
    }
  };

  // Check if user email is set, if not, redirect to WelcomePage
  useEffect(() => {
    if (!userEmail) {
      navigate("/"); // Assuming you have a WelcomePage to redirect to
    }
    // Request fullscreen mode when the component mounts
    requestFullscreen();
  }, [userEmail, navigate]);

  const handleProceed = () => {
    if (accepted) {
      navigate("/quiz"); // Proceed to QuizPage
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Instructions
        </h1>

        <div className="space-y-4 text-gray-700 dark:text-gray-300 mb-6">
          <p className="text-lg text-gray-800 dark:text-gray-200">
            Before you start the quiz, please carefully read all the
            instructions below:
          </p>

          <ol className="list-decimal list-inside space-y-2">
            <li>The quiz duration is strictly 30 minutes.</li>
            <li>
              There are 15 multiple-choice questions (MCQs); each question has 4
              options with only one correct answer.
            </li>
            <li>
              Each question carries 1 mark, making the maximum possible score
              15. There is no negative marking.
            </li>
            <li>You may freely navigate between questions during the quiz.</li>
            <li>
              When the 30-minute time limit expires, the quiz will be submitted
              automatically.
            </li>
            <li>
              Upon completion, your results will be displayed—showing each
              question’s correct answer, your selected answer, and your overall
              score. Additionally, your total marks will be sent to your
              registered email address.
            </li>
            <li>
              Questions will be color-coded for your convenience:
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <span className="text-green-500">Green</span> indicates
                  answered questions.
                </li>
                <li>
                  <span className="text-yellow-500">Yellow</span> indicates
                  questions you have visited but not answered.
                </li>
                <li>
                  <span className="text-gray-500">Gray</span> indicates
                  questions you have yet to visit.
                </li>
              </ul>
            </li>
            <li>
              Please ensure you have a stable internet connection throughout the
              quiz.
            </li>
            <li>
              Do not refresh or close your browser during the quiz to prevent
              loss of progress. Each candidate is allowed only one attempt per
              email address; retakes are not permitted with the same email.
            </li>
          </ol>
        </div>

        <label className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer select-none">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-indigo-600 dark:text-cyan-400 rounded focus:ring-indigo-500 dark:focus:ring-cyan-300"
            checked={accepted}
            onChange={() => setAccepted(!accepted)}
          />
          <span>
            I read all the instructions carefully and ready to process.
          </span>
        </label>

        <button
          disabled={!accepted}
          className={`mt-6 w-full py-3 rounded font-semibold text-white transition 
            ${
              accepted
                ? "bg-indigo-600 hover:bg-indigo-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          onClick={handleProceed}
        >
          Proceed to Quiz
        </button>
      </div>
    </div>
  );
}
