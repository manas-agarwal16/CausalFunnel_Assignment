// in parent page/component
import React, { useState, useEffect } from "react";
import Report from "../components/Report.jsx";
import API from "../helper/axiosInstance.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToggleButton } from "../components/ToggleButton.jsx";

// Example fetch (replace with real API call)
export default function ReportPage() {
  const [quizReport, setQuizReport] = useState([]);
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.user.email);
  const [score, setScore] = useState(0);
  const isQuizSubmitted = useSelector((state) => state.user.quizSubmitted);

  useEffect(() => {
    if (!userEmail || !isQuizSubmitted) {
      navigate("/");
    }

    const fetchQuizReport = async () => {
      // Replace this with your real fetching logic
      const response = await API.get(`/quiz-report/${userEmail}`);

      setQuizReport(
        response?.data?.data?.quizReport?.quizQuestionsAndResponses || []
      );
      setScore(response?.data?.data?.quizReport?.score || 0);
    };

    fetchQuizReport();
  }, [userEmail, isQuizSubmitted, navigate]);

  if (!quizReport.length)
    return <div className="text-center mt-32">Loading...</div>;

  return (
    <>
      <ToggleButton />
      <Report quizReport={quizReport} score={score} email={userEmail} />
    </>
  );
}
