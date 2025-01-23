import React, { useContext, useState } from "react";
import useAxiosSecure from "../../shared/useAxiosSecure";
import CommentsPage from "./commentPage";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Comment = ({ postId, onCommentAdded }) => {
  const [commentText, setCommentText] = useState("");
  const axiosSecure = useAxiosSecure();
const {user}=useContext(AuthContext)
  const handleAddComment = async (e) => {
    e.preventDefault();

    console.log("postId:", postId, "commentText:", commentText);

    try {
      const response = await axiosSecure.post(`/posts/${postId}/comments`, {
        text: commentText,
        authorEmail:user?.email,
      },
      {
        withCredentials: true, 
      }
    );
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
      <Link to={`/comments/${postId}`}>Show All Comments</Link>
    </form>
    
    </div>
    
  );
};

export default Comment;


