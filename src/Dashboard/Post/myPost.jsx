import { useState, useEffect, useContext } from "react";
import useAxiosSecure from "../../shared/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaCommentAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      if (user && user.email) {
        try {
          const res = await axiosSecure.get(`https://y-gamma-rouge.vercel.app/posts?email=${user.email}`);
          setPosts(res.data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    };

    fetchPosts();
  }, [user, axiosSecure]);



  const handleDeletePost = async (postId) => {
    try {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (confirmation.isConfirmed) {
        await axiosSecure.delete(`/posts/${postId}`);
        setPosts(posts.filter((post) => post._id !== postId));
        Swal.fire({
          title: "Deleted!",
          text: "Your post has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to delete post. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="overflow-x-auto -mt-64">
      <h2 className="text-xl text-center font-bold mb-10">User Posts</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Post Title</th>
            <th>Number of Votes</th>
            <th>Comment Button</th>
            <th>Delete Button</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No posts available.
              </td>
            </tr>
          ) : (
            posts.map((post) => (
              <tr key={post._id}>
                <td>{post.posttitle}</td>
                <td className="text-center"><Typography>{post.upvote - post.downvote}</Typography></td>
                <td>
                  <div>
                    <Link to={`/comments/${post._id}`}>
                      <button
                        className="btn btn-sm btn-primary"
                        disabled={isLoadingComments}
                      >
                        <FaCommentAlt /> View Comments
                      </button></Link>
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDeletePost(post._id)}
                  >
                    <MdDeleteForever /> Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyPost;
