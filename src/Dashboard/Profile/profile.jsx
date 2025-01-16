import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Providers/AuthProvider";

const Profile = () => {
    const {user}=useContext(AuthContext)
//   const [user, setUser] = useState(null);
//   const userEmail = "test@example.com"; 

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`/users?email=${userEmail}`);
//         setUser(response.data); 
//       } catch (error) {
//         console.error("Failed to fetch user:", error);
//       }
//     };

//     fetchUser();
//   }, [userEmail]);

  return (
    <div className="avatar -mt-96">
      <div className="w-40 rounded-full">
        <img
          src={
            user?.photoURL || "https://via.placeholder.com/150" 
          }
          alt="User Profile"
          className="rounded-full"
        />
      </div>
      {user && (
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold">{user?.displayName}</h2>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;


  
