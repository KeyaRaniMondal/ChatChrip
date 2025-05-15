import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AskQuestions = ({ search, setSearch }) => {
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    try {
      const response = await axios.post("https://y-gamma-rouge.vercel.app/questions", {
        text: question,
      });
      setQuestion("");
      navigate("/answer");
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  return (
    <div className="pt-5 w-full flex flex-col justify-center items-center my-10 sm:my-16 md:my-20 lg:my-28 px-4 sm:px-6 md:px-10 lg:px-16">
      {/* Ask Questions Section */}
      <div className="w-full max-w-2xl  rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-center py-2">
          Ask Your Questions
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4">
          Ask questions to clear your doubt and get chance to interact and connect with community...
        </p>
        <textarea
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full min-h-[100px] sm:min-h-[120px] p-3 sm:p-4 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAskQuestion}
            className="bg-yellow-500 text-white px-4 py-1.5 sm:px-5 sm:py-2 rounded-md hover:bg-yellow-600 transition text-sm sm:text-base"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskQuestions;