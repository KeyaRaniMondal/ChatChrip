import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Providers/AuthProvider";
import bronze from '../../assets/bronze.jpg'

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [hasBronzeBadge, setHasBronzeBadge] = useState(false);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/posts?email=${user.email}&userId=${user.uid}&limit=3`)
        .then(response => {
          console.log("API Response:", response.data);
          setPosts(Array.isArray(response.data) ? response.data : response.data.data || []);
        })
        .catch(error => {
          console.error("Error fetching user posts:", error);
          setPosts([]);
        });
    }
  }, [user]);


  return (
    <div className="profile-page p-6">

      <div className="avatar text-center">
        <div className="w-40 h-40 mx-auto rounded-full overflow-hidden">
          <img
            src={
              user?.photoURL || "https://via.placeholder.com/150"
            }
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </div>
        {user && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold">{user?.displayName || "User"}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        )}
      </div>

      {user && (
        <div className="badges mt-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Badges</h3>
          <img src={bronze} alt="" />
          {hasBronzeBadge && (
            <div className="badge bg-bronze text-white px-4 py-2 rounded-full inline-block">
              🥉 Bronze Badge
            </div>
          )}
        </div>
      )}

      <div className="recent-posts mt-8">
        <h3 className="text-lg font-semibold mb-4">My Recent Posts</h3>
        {posts.length > 0 ? (
          <ul className="space-y-4">
            {posts.slice(0, 3).map((post, index) => (
              <li key={index} className="p-4 border rounded-lg shadow">
                <h4 className="text-xl font-bold">{post.posttitle}</h4>
                <p className="text-gray-600">{post.content}</p>
                <p className="text-sm text-gray-400 mt-2">
                  Posted on: {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You have no recent posts.</p>
        )}

      </div>
    </div>
  );
};

export default Profile;



