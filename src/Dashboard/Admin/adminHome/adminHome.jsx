import React, { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../shared/useAxiosSecure";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const { data: posts = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/posts");
      return res.data;
    },
  });

  const { data: comments = [] } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/comments");
      return res.data;
    },
  });

  const pieData = {
    labels: ["Users", "Posts", "Comments"],
    datasets: [
      {
        label: "Site Data",
        data: [users.length, posts.length, comments.length],
        backgroundColor: ["#DA498D", "#16404D", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#ECE852"],
      },
    ],
  };

  return (
    <div className="p-4 md:p-6 xl:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-center mt-8 md:mt-10">
        Welcome, Admin!
      </h1>
      <p className="mt-3 md:mt-4 text-center mb-8 md:mb-10">
        This is the admin dashboard where you can manage posts, users, and more.
      </p>

      {/* Stats Section */}
      <div className="mt-6">
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
          {/* Admin Profile Stat */}
          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar online">
                <div className="w-14 md:w-16 rounded-full">
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                    alt="Admin Avatar"
                    className="w-16 md:w-20 h-16 md:h-20 rounded-full"
                  />
                </div>
              </div>
            </div>
            <div className="stat-value text-xl md:text-2xl">
              {user?.displayName || "Admin"}
            </div>
            <div className="stat-desc text-secondary">
              {user?.email || "admin@example.com"}
            </div>
          </div>

          {/* Comments Stat */}
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Comments:</div>
            <div className="stat-value text-xl md:text-2xl">{comments.length}</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          {/* Users Stat */}
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Users:</div>
            <div className="stat-value text-xl md:text-2xl">{users.length}</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          {/* Posts Stat */}
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Posts:</div>
            <div className="stat-value text-xl md:text-2xl">{posts.length}</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>

      {/* Pie Chart Section */}
      <h2 className="text-xl md:text-2xl font-bold text-center mt-12 md:mt-16">
        Forum Statistics
      </h2>
      <div className="mt-8 md:mt-10 w-full md:w-96 lg:w-1/2 xl:w-1/3 mx-auto">
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default AdminHome;