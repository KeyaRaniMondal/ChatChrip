import { useState, useEffect } from "react";
import axios from "axios";

const AskQuestions = ({ search, setSearch }) => {
    const [question, setQuestion] = useState("");
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios.get("https://y-gamma-rouge.vercel.app/questions")
            .then(response => setQuestions(response.data))
            .catch(error => console.error("Error fetching questions:", error));
    }, []);

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
<div className="w-full flex flex-col md:flex-row justify-between items-start mt-40 px-10 gap-10">
  {/* Ask Questions Section */}
  <div className="w-full md:w-1/2">
    <h2 className="text-xl font-bold text-center bg-gradient-to-r from-[#4B5945] to-[#FFB200]">Ask Your Questions</h2>
    <div className="mt-4 flex w-full">
      <textarea
        type="text"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="textarea textarea-warning input-bordered text-black w-full"
      ></textarea>
    </div>
    <div className="flex justify-end mt-5">
      <button
        onClick={handleAskQuestion}
        className="btn btn-outline px-6 py-2"
      >
        Ask
      </button>
    </div>
  </div>

  {/* Recent Questions Section */}
  <div className="w-full md:w-1/2">
    <h3 className="text-xl font-bold text-center mb-5 bg-gradient-to-r from-[#4B5945] to-[#FFB200]">Recent Questions</h3>
    <ul className="space-y-3">
      {questions.map((q, index) => (
        <li key={index} className="bg-gray-100 p-3 rounded shadow">
          {q.text}
        </li>
      ))}
    </ul>
  </div>
</div>

    );
};

export default AskQuestions;
