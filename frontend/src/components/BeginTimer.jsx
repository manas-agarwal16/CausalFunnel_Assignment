import React from "react";

const BeginTimer = ({ beginCountdown }) => {
  return (
    <div className="fixed inset-0 z-50 bg-gray-900/80 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl px-12 py-16 flex flex-col items-center gap-3 animate-fade-in-up">
        <div className="text-4xl font-extrabold text-indigo-600 dark:text-cyan-400 mb-4">
          Quiz will start in
        </div>
        <div className="text-6xl font-bold text-gray-900 dark:text-white animate-pulse">
          {beginCountdown}
        </div>
        <div className="mt-6 text-lg text-gray-700 dark:text-gray-200">
          Get ready! The quiz interface will appear in a moment.
        </div>
      </div>
      <style>
        {`
            .animate-fade-in-up {
              animation: fadeInUp .8s both;
            }
            @keyframes fadeInUp { 0% {opacity: 0; transform: translateY(30px);} 100% {opacity: 1; transform: none;} }
          `}
      </style>
    </div>
  );
};

export default BeginTimer;
