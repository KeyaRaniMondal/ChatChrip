import { useState, useEffect, useContext } from "react";
import useAxiosSecure from "../../shared/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaCommentAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user && user.email) {
        try {
          const res = await axiosSecure.get(`http://localhost:5000/posts?email=${user.email}`);
          setPosts(res.data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    };

    fetchPosts();
  }, [user, axiosSecure]);

  return (
    <div className="overflow-x-auto -mt-64">
      <h2 className="text-xl text-center font-bold mb-10">User Posts</h2>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Post Title</th>
            <th>Number of votes</th>
            <th>Comment Button</th>
            <th>Delete Button</th>
          </tr>
        </thead>
        <tbody className="list-none">
          {posts.length === 0 ? (
            <p>No posts available.</p>
          ) : (
            posts.map((post) => (
              <tr key={post._id}>
                <td>{post.posttitle}</td>
                <td>{post.votes}</td>
                <td><FaCommentAlt /></td>
                <td><MdDeleteForever /></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyPost;

