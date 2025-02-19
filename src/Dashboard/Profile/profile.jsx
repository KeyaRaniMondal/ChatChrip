import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Providers/AuthProvider";
import bronze from '../../assets/bronze.jpg'
import gold from '../../assets/gold.jpg'

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [hasBronzeBadge, setHasBronzeBadge] = useState(false);
  const [hasGoldBadge, setHasGoldBadge] = useState(false);
  useEffect(() => {
    if (user) {
      axios.get(`/users/${user.email}`)
        .then(response => {
          setHasBronzeBadge(response.data.subscription === 'bronze');
          setHasGoldBadge(response.data.subscription === 'gold');
        })
        .catch(error => console.error("Error fetching user subscription:", error));
    }
    axios.get(`https://y-gamma-rouge.vercel.app/posts?email=${user.email}&userId=${user.uid}&limit=3`)
      .then(response => {
        console.log("API Response:", response.data);
        setPosts(Array.isArray(response.data) ? response.data : response.data.data || []);
      })
      .catch(error => {
        console.error("Error fetching user posts:", error);
        setPosts([]);
      });
  }, [user]);

  return (

    <div className="profile-page p-6  flex flex-col items-center lg:-mt-14">
      <div className="avatar text-center">
        <div className="w-40 h-40 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </div>
        {user && (
          <div className="card w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl shadow-sm mt-4">
            <div className="card-body p-4">
              <h2 className="text-left font-bold text-lg">Name: {user?.displayName || "User"}</h2>
              <p className="text-left text-gray-600 text-sm">Email: {user.email}</p>
              <p className="text-left text-gray-600 text-sm">Phone Number: {user.PhoneNumber || "N/A"}</p>
              <p className="text-left text-gray-600 text-sm">Address: {user.Address || "N/A"}</p>
            </div>
          </div>
        )}
      </div>

      <div className="recent-posts mt-8 w-full max-w-md md:max-w-lg lg:max-w-xl">
        <h3 className="text-lg font-semibold mb-4 text-center">My Recent Posts</h3>

        {posts.length > 5 && (
          <div className="badges mt-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Badges</h3>
            <img src={gold} alt="Gold Badge" className="w-20 mx-auto" />
          </div>
        )}

        {posts.length > 0 ? (
          <ul className="space-y-4">
            {posts.slice(0, 3).map((post, index) => (
              <li key={index} className="p-4 border rounded-lg shadow w-full">
                <h4 className="text-lg md:text-xl font-bold">{post.posttitle}</h4>
                <p className="text-gray-600 text-sm md:text-base">{post.content}</p>
                <p className="text-xs md:text-sm text-gray-400 mt-2">
                  Posted on: {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">You have no recent posts.</p>
        )}
      </div>
    </div>

  );
};

export default Profile;



