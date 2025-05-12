import { useState, useEffect } from "react";
import axios from "axios";

const AskQuestions = ({ search, setSearch }) => {
    const [question, setQuestion] = useState("");

    const handleAskQuestion = async () => {
        if (!question.trim()) return;

        try {
            const response = await axios.post("https://y-gamma-rouge.vercel.app/questions", {
                text: question,
            });

            setQuestions(prev => [...prev, response.data]);
            setQuestion("");
        } catch (error) {
            console.error("Error submitting question:", error);
        }
    };

    return (
      <div className="w-full flex flex-col md:flex-row justify-between items-start mt-24 px-6 md:px-16 gap-10">
        {/* Ask Questions Section */}
        <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-center text-white py-2 rounded-t-md bg-gradient-to-r from-[#4B5945] to-[#FFB200]">
            Ask Your Questions
          </h2>
          <textarea
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="mt-4 w-full min-h-[120px] p-4 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleAskQuestion}
              className="bg-yellow-500 text-white px-5 py-2 rounded-md hover:bg-yellow-600 transition"
            >
              Ask
            </button>
          </div>
        </div>
      </div>

    );
};

export default AskQuestions;
