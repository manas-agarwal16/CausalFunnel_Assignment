import React, { useState } from "react";

export default function WelcomePage() {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-indigo-100 dark:from-[#232946] dark:via-[#15161c] dark:to-[#191a22] transition-colors duration-500">
      <div className="bg-white/80 dark:bg-[#232946]/80 shadow-xl rounded-3xl p-8 md:p-12 max-w-lg w-full 
        animate-fade-in-up border border-gray-200 dark:border-[#35375a] relative overflow-hidden"
      >
        {/* Decorative Circles */}
        <div className="absolute -top-8 -left-8 bg-indigo-400/30 w-20 h-20 rounded-full blur-lg animate-pulse pointer-events-none"></div>
        <div className="absolute -bottom-8 -right-8 bg-sky-400/20 w-32 h-32 rounded-full blur-xl animate-pulse pointer-events-none"></div>

        {/* Main Content */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-down">
          Welcome to the <span className="text-indigo-600 dark:text-cyan-400">Quiz</span>!
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 animate-fade-in">
          Please enter your email below. <br />
          <span className="text-indigo-600 dark:text-teal-300 font-semibold">The result of the quiz will be shared to this email.</span>
        </p>

        <form
          className="flex flex-col gap-4 mt-2 w-full animate-fade-in-up"
          onSubmit={(e) => {
            e.preventDefault();
            // Handle your logic here
            alert("Thank you! We'll send results to: " + email);
          }}
        >
          {/* Email Input */}
          <div className={`relative transition-all duration-300 ${
            focused ? "ring-2 ring-indigo-500" : ""
          } rounded-lg`}>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full py-3 pl-4 pr-12 border border-gray-300 dark:border-[#35375a] rounded-lg bg-white/80 dark:bg-[#15161c]/80 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none transition focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Animated Email Icon */}
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-500 dark:text-cyan-300 transition-opacity duration-200 pointer-events-none">
              <svg fill="none" viewBox="0 0 24 24" className="w-6 h-6 animate-fade-in-delay">
                <path
                  d="M3 8l7.89 5.26a3 3 0 003.22 0L22 8M5 7h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          {/* CTA Button with Animation */}
          <button
            type="submit"
            className="py-3 mt-1 rounded-lg bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-lg shadow-lg transition-transform transform hover:-translate-y-1 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
          >
            Start Quiz
          </button>
        </form>
      </div>

      {/* Keyframe Animations Tailwind Additions */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 1s both;
          }
          .animate-fade-in-up {
            animation: fadeInUp 1s both;
          }
          .animate-fade-in-down {
            animation: fadeInDown 1.1s both;
          }
          .animate-fade-in-delay {
            animation: fadeIn 1.6s 0.3s both;
          }

          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(18px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          @keyframes fadeInDown {
            0% { opacity: 0; transform: translateY(-20px);}
            100% { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
}
