import React from "react";

const TOTAL_QUESTIONS = 15;

const QuestionPanel = ({
  currentQuestionIndex,
  questions,
  answers,
  selectOption,
  isSubmitted,
  goToQuestion,
}) => {
  return (
    <main
      key={currentQuestionIndex}
      className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col opacity-0 animate-fadeInSlow"
    >
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
  );
};

export default QuestionPanel;
