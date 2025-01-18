import React, { useState } from "react";
import axios from "axios";

const Comment= ({ postId, onCommentAdded }) => {
  const [commentText, setCommentText] = useState("");

  const handleAddComment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/posts/${postId}/comments`, {
        text: commentText,
      });
      onCommentAdded(response.data.comment); // Notify parent component of new comment
      setCommentText(""); // Clear the input field
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <form onSubmit={handleAddComment} className="add-comment mt-5">
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
        className="border rounded w-full p-2"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded mt-2"
        disabled={!commentText.trim()}
      >
        Submit
      </button>
    </form>
  );
};

export default Comment;

