import React from "react";

const Timer = ({ mainTimeLeft, formatTime }) => {
  return (
    <div className="mt-8 text-center">
      <span className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">
        Time Remaining
      </span>
      <div
        className={`text-3xl font-bold ${
          mainTimeLeft <= 60
            ? "text-red-600 dark:text-red-400"
            : "text-indigo-700 dark:text-cyan-400"
        }`}
        aria-live="polite"
      >
        {formatTime(mainTimeLeft)}
      </div>
    </div>
  );
};

export default Timer;
