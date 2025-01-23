import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import useAdmin from '../../../hooks/useAdmin';

const AdminHome = () => {
//   const [admin, setAdmin] = useState({});
//   const [stats, setStats] = useState({});
//   const [tags, setTags] = useState([]);
//   const [newTag, setNewTag] = useState("");

//   useEffect(() => {
//     const fetchAdminStats = async () => {
//       try {
//         const response = await axios.get('/admin/stats');
//         setAdmin(response.data.admin);
//         setStats(response.data.stats);
//       } catch (error) {
//         console.error('Error fetching admin stats:', error);
//       }
//     };

//     const fetchTags = async () => {
//       try {
//         const response = await axios.get('/tags');
//         setTags(response.data);
//       } catch (error) {
//         console.error('Error fetching tags:', error);
//       }
//     };

//     fetchAdminStats();
//     fetchTags();
//   }, []);

//   const handleAddTag = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/tags', { tagName: newTag });
//       setTags((prev) => [...prev, response.data.tag]);
//       setNewTag("");
//     } catch (error) {
//       console.error('Error adding tag:', error);
//     }
//   };

  // return (
  //   <div className="container mx-auto mt-5">
      {/* Admin Profile Section */}
      {/* <div className="flex items-center mb-10">
        <img src={admin.image || '/placeholder.jpg'} alt="Admin" className="w-24 h-24 rounded-full mr-5" /> 
        <div> 
          <h1 className="text-2xl font-bold">{admin.name}</h1>
          <p>Email: {admin.email}</p>
          <p>Number of Posts: {admin.posts}</p>
          <p>Number of Comments: {admin.comments}</p>
        </div>
      </div> */}

      {/* Pie Chart */}
      {/* <div className="mb-10">
        <h2 className="text-xl font-bold mb-4">Site Statistics</h2>
        {stats.totalPosts && (
          <Pie
            data={{
              labels: ['Posts', 'Comments', 'Users'],
              datasets: [
                {
                  data: [stats.totalPosts, stats.totalComments, stats.totalUsers],
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }}
          />
        )} 
      </div> */}

      {/* Add Tags Form */}
      {/* <div className="mb-10">
        <h2 className="text-xl font-bold mb-4">Add Tags</h2>
        <form onSubmit={handleAddTag} className="flex items-center">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Enter tag name"
            className="border rounded px-4 py-2 mr-2"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Add Tag
          </button>
        </form>
      </div> */}

      {/* Tags List */}
      {/* <div>
        <h2 className="text-xl font-bold mb-4">Existing Tags</h2>
        <ul>
           {tags.map((tag) => (
            <li key={tag._id} className="border-b py-2">{tag.tagName}</li>
          ))} 
        </ul>
      </div> */}
    {/* </div> */}
    const [isAdmin, isAdminLoading] = useAdmin();

    if (isAdminLoading) {
        return <p>Loading...</p>;
    }

    if (!isAdmin) {
        return <p>You are not authorized to access this page.</p>; 
    }

    return (
        <div>
            <h1>Welcome, Admin!</h1>
            <p>This is the admin dashboard where you can manage posts, users, and more.</p>
        </div>
    );
};

export default AdminHome;
