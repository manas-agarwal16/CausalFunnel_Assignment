import React from "react";
import { getOptionLabel } from "../helper/optionLabel.js";

export default function Report({ quizReport = [], score = 0 }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center px-4 py-8 transition-colors duration-500">
      {/* Total Score */}
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          Quiz Report
        </h2>
        <div className="text-lg text-gray-700 dark:text-gray-200 mb-2">
          Total Score:&nbsp;
          <span
            className={`font-semibold ${
              score === quizReport.length
                ? "text-green-600 dark:text-green-400"
                : "text-indigo-600 dark:text-cyan-400"
            }`}
          >
            {score} / {quizReport.length}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Each question carries 1 mark
        </p>
      </div>

      {/* Questions List */}
      <div className="w-full max-w-2xl space-y-8">
        {quizReport.map((q, idx) => (
          <div
            key={q.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex flex-col gap-4"
          >
            {/* Question Text */}
            <div className="flex items-start gap-2">
              <span className="font-medium text-indigo-500 dark:text-cyan-400">
                {idx + 1}.
              </span>
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                {q.question}
              </span>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {q.options.map((opt, optIdx) => {
                const isUser = q.selectedAnswer === q.options[optIdx];
                const isCorrect = q.correctAnswer === q.options[optIdx];

                let optClass = "border border-gray-300 dark:border-gray-600";
                if (isCorrect && isUser) {
                  optClass +=
                    " bg-green-100 dark:bg-green-600/30 border-green-400 dark:border-green-500 text-green-700 dark:text-green-200 font-semibold";
                } else if (isCorrect) {
                  optClass +=
                    " bg-emerald-50 dark:bg-green-800/40 border-green-400 dark:border-green-500 text-green-800 dark:text-green-200";
                } else if (isUser && !isCorrect) {
                  optClass +=
                    " bg-red-100 dark:bg-red-700/50 border-red-400 dark:border-red-500 text-red-700 dark:text-red-200 font-semibold";
                }

                return (
                  <div
                    key={optIdx}
                    className={
                      `relative py-3 px-4 rounded transition-all select-none flex gap-2 items-center ` +
                      optClass
                    }
                  >
                    <span className="inline-block min-w-[1.5rem] text-sm font-bold">
                      {getOptionLabel(optIdx)}.
                    </span>
                    <span className="text-gray-800 dark:text-gray-100">
                      {opt}
                    </span>
                    {isCorrect && (
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 ml-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-green-500 dark:text-green-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    )}
                    {isUser && !isCorrect && (
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 ml-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-red-400 dark:text-red-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* User's answer display */}
            <div className="flex flex-wrap gap-2 text-sm text-gray-800 dark:text-gray-200 mt-1">
              <span>
                <span className="font-medium">Your answer:</span>{" "}
                {q.selectedAnswer !== null && q.selectedAnswer !== undefined ? (
                  q.selectedAnswer
                ) : (
                  <span className="italic text-gray-400 dark:text-gray-300">
                    Not Answered
                  </span>
                )}
              </span>
              <span>
                <span className="font-medium">Correct answer:</span>{" "}
                {q.correctAnswer}
              </span>
              <span>
                {q.selectedAnswer === q.correctAnswer ? (
                  <span className="ml-2 text-green-600 dark:text-green-400 font-semibold">
                    (Correct)
                  </span>
                ) : (
                  <span className="ml-2 text-red-600 dark:text-red-400 font-semibold">
                    (Incorrect)
                  </span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
