import { useState, useEffect } from "react";
import axios from "axios";

const AskQuestions = ({ search, setSearch }) => {
    const [question, setQuestion] = useState("");
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios.get("https://y-gamma-rouge.vercel.app/aquestions")
            .then(response => setQuestions(response.data))
            .catch(error => console.error("Error fetching questions:", error));
    }, []);

    const handleAskQuestion = async () => {
        if (!question.trim()) return;

        try {
            const response = await axios.post("https://y-gamma-rouge.vercel.app/aquestions", {
                text: question,
            });

            setQuestions(prev => [...prev, response.data]); 
            setQuestion("");
        } catch (error) {
            console.error("Error submitting question:", error);
        }
    };

    return (
        <div className="w-full flex flex-col items-center mt-40">
            <h2 className="text-xl font-bold text-center">Ask Your Questions</h2>
            <div className="mt-4 flex w-full max-w-xl">

                <textarea type="text" placeholder="Ask a question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)} className="textarea textarea-neutral input-bordered text-black w-full"></textarea>

            </div>
            <button
                onClick={handleAskQuestion}
                className="btn btn-outline px-6 py-2 mt-5 flex ml-[500px]"
            >
                Ask
            </button>
            <div className="mt-6 w-full max-w-xl">
                <h3 className="text-lg font-semibold">Recent Questions</h3>
                <ul className="mt-2 space-y-2">
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
