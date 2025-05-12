import axios from "axios";
import { useEffect, useState } from "react";

const Answer = () => {
    const [questions, setQuestions] = useState([]);
    const [answerInputs, setAnswerInputs] = useState({});
    const [showAnswerBox, setShowAnswerBox] = useState({});
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        axios
            .get("https://y-gamma-rouge.vercel.app/questions")
            .then((response) => setQuestions(response.data))
            .catch((error) => console.error("Error fetching questions:", error));
    }, []);

    const handleAnswerInputChange = (questionId, text) => {
        setAnswerInputs((prev) => ({ ...prev, [questionId]: text }));
    };

    const handleSubmitAnswer = (questionId) => {
        const answerText = answerInputs[questionId];
        if (!answerText) return;

        axios
            .post(`https://y-gamma-rouge.vercel.app/questions/${questionId}/answers`, {
                text: answerText,
                userName: "Current User", // Replace with actual user data
            })
            .then(() => {
                setAnswerInputs((prev) => ({ ...prev, [questionId]: "" }));
                fetchAnswers(questionId); // Refresh answer list
            })
            .catch((error) => console.error("Error submitting answer:", error));
    };

    const fetchAnswers = (questionId) => {
        axios
            .get(`https://y-gamma-rouge.vercel.app/questions/${questionId}/answers`)
            .then((res) =>
                setAnswers((prev) => ({ ...prev, [questionId]: !prev[questionId] ? res.data : null }))
            )
            .catch((err) => console.error("Error fetching answers:", err));
    };

    const toggleAnswerBox = (questionId) => {
        setShowAnswerBox((prev) => ({
            ...prev,
            [questionId]: !prev[questionId],
        }));
    };

    

    return (
        <div className="w-full flex flex-col md:flex-row justify-between items-start mt-24 px-6 md:px-16 gap-10">
            <ul className="list bg-base-100 rounded-box shadow-md w-full md:w-2/3">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                    List of Questions
                </li>

                {questions.length ? (
                    questions.map((q) => (
                        <li
                            key={q._id}
                            className="bg-gray-100 p-4 m-2 rounded-md shadow-sm text-sm text-gray-800 flex flex-col gap-2"
                        >
                            {/* User Info */}
                            <div className="flex items-center gap-3">
                                <img
                                    className="size-10 rounded-full"
                                    src={
                                        q.userImage ||
                                        "https://img.daisyui.com/images/profile/demo/1@94.webp"
                                    }
                                    alt="User"
                                />
                                <div>
                                    <p className="font-semibold">{q.userName || "Anonymous"}</p>
                                    <p className="text-xs text-gray-500">{q.date || "Today"}</p>
                                </div>
                            </div>

                            {/* Question Text */}
                            <div className="pl-12">{q.text}</div>

                            {/* Buttons */}
                            <div className="pl-12 flex gap-4 mt-2">
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => toggleAnswerBox(q._id)}
                                >
                                    {showAnswerBox[q._id] ? "Cancel" : "Answer"}
                                </button>

                                <button
                                    className="btn btn-sm btn-outline"
                                    onClick={() => fetchAnswers(q._id)}
                                >
                                    {answers[q._id] ? "Close" : "Show Answer"}
                                </button>
                            </div>

                            {/* Answer Box */}
                            {showAnswerBox[q._id] && (
                                <div className="pl-12 mt-2 flex flex-col gap-2">
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        rows={3}
                                        placeholder="Write your answer..."
                                        value={answerInputs[q._id] || ""}
                                        onChange={(e) =>
                                            handleAnswerInputChange(q._id, e.target.value)
                                        }
                                    />
                                    <button
                                        className="btn btn-outline btn-sm self-start"
                                        onClick={() => handleSubmitAnswer(q._id)}
                                    >
                                        Submit Answer
                                    </button>
                                </div>
                            )}

                            {/* Answer List */}
                            {answers[q._id] &&
                                answers[q._id].map((a, idx) => (
                                    <div
                                        key={idx}
                                        className="pl-12 bg-white p-2 mt-2 rounded shadow text-sm text-gray-700"
                                    >
                                        <strong>{a.userName || "User"}:</strong> {a.text}
                                    </div>
                                ))}
                        </li>
                    ))
                ) : (
                    <li className="p-4 text-center text-gray-500">No questions yet.</li>
                )}
            </ul>
        </div>
    );
};

export default Answer;
