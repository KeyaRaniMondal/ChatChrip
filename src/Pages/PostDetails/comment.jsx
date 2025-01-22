import React, { useState } from "react";
import useAxiosSecure from "../../shared/useAxiosSecure";
import CommentsPage from "./commentPage";

const Comment = ({ postId, onCommentAdded }) => {
  const [commentText, setCommentText] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleAddComment = async (e) => {
    e.preventDefault();

    console.log("postId:", postId, "commentText:", commentText);

    try {
      const response = await axiosSecure.post(`/posts/${postId}/comments`, {
        text: commentText,
      });
      onCommentAdded(response.data.comment);
      setCommentText(""); 
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
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
    <CommentsPage></CommentsPage>
    </div>
    
  );
};

export default Comment;


