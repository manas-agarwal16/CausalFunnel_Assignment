import React from "react";

const SubmitButton = ({ handleSubmit, isSubmitted }) => {
  return (
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
  );
};

export default SubmitButton;
