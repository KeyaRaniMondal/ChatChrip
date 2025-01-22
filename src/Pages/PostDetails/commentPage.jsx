import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAxiosSecure from '../../shared/useAxiosSecure';

const CommentsPage = () => {
  const { postId } = useParams(); 
  const [comments, setComments] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState({});
  const [modalComment, setModalComment] = useState("");
  const axiosSecure=useAxiosSecure()

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosSecure.get(`/posts/${postId}/comments`);
        console.log(response.data); 
        setComments(response.data); 
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleFeedbackChange = (commentId, feedback) => {
    setSelectedFeedback((prev) => ({
      ...prev,
      [commentId]: feedback,
    }));
  };

  const handleReportClick = async (commentId) => {
    try {
      await axios.post(`/comments/${commentId}/report`, {
        feedback: selectedFeedback[commentId],
      });

      setSelectedFeedback((prev) => ({
        ...prev,
        [commentId]: "reported",
      }));
    } catch (error) {
      console.error("Error reporting comment:", error);
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-4">Comments for Post {postId}</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Comment</th>
            <th className="border px-4 py-2">Feedback</th>
            <th className="border px-4 py-2">Report</th>
          </tr>
        </thead>
        <tbody>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <tr key={comment._id}>
                <td className="border px-4 py-2">{comment.authorEmail}</td> 
                <td className="border px-4 py-2">
                  {comment.text.length > 20 ? (
                    <>
                      {comment.text.substring(0, 20)}...
                      <button 
                        className="text-blue-500 underline ml-1" 
                        onClick={() => setModalComment(comment.text)}
                      >
                        Read More
                      </button>
                    </>
                  ) : (
                    comment.text
                  )}
                </td>
                <td className="border px-4 py-2">
                  <select 
                    className="border rounded p-1" 
                    value={selectedFeedback[comment._id] || ""} 
                    onChange={(e) => 
                      handleFeedbackChange(comment._id, e.target.value)
                    }
                    disabled={selectedFeedback[comment._id] === "reported"}
                  >
                    <option value="" disabled>Select Feedback</option>
                    <option value="Offensive Language">Offensive Language</option>
                    <option value="Spam Content">Spam Content</option>
                    <option value="Hate Speech">Hate Speech</option>
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <button 
                    className={`bg-red-500 text-white p-2 rounded ${
                      !selectedFeedback[comment._id] || 
                      selectedFeedback[comment._id] === "reported" 
                        ? "opacity-50 cursor-not-allowed" 
                        : ""
                    }`}
                    disabled={
                      !selectedFeedback[comment._id] || 
                      selectedFeedback[comment._id] === "reported"
                    }
                    onClick={() => handleReportClick(comment._id)}
                  >
                    {selectedFeedback[comment._id] === "reported" 
                      ? "Reported" 
                      : "Report"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No comments available.</td>
            </tr>
          )}
        </tbody>
      </table>

      {modalComment && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" 
          onClick={() => setModalComment("")}
        >
          <div 
            className="bg-white p-5 rounded shadow-lg w-1/2" 
            onClick={(e) => e.stopPropagation()} 
          >
            <h2 className="text-xl font-bold mb-3">Full Comment</h2>
            <p>{modalComment}</p>
            <button 
              className="bg-blue-500 text-white p-2 rounded mt-3" 
              onClick={() => setModalComment("")}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsPage;