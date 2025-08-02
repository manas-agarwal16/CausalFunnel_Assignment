import React, { useEffect, useState } from "react";

// ThemeToggleButton component
export function ToggleButton() {
  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div>
      <button
        className="absolute top-4 right-4 p-2 pr-4 pl-3 rounded-full bg-gray-100 dark:bg-gray-800 shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center gap-2"
        aria-label="Toggle theme"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <>
            <span className="text-lg">☀️</span>
            <span className="hidden sm:block text-sm text-white">Light Mode</span>
          </>
        ) : (
          <>
            <svg
              className="w-6 h-6 text-gray-600 dark:text-cyan-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                fill="currentColor"
              />
            </svg>
            <span className="text-sm text-gray-800 dark:text-cyan-200">
              Dark Mode
            </span>
          </>
        )}
      </button>
    </div>
  );
}
