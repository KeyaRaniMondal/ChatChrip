// import axios from 'axios'
// export const axiosSecure = axios.create({
//     baseURL: 'https://y-gamma-rouge.vercel.app/',
//     withCredentials:true,
// });

// const useAxiosSecure=()=>{
// return axiosSecure
// }
// export default useAxiosSecure

import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

export const axiosSecure = axios.create({
  baseURL: "https://y-gamma-rouge.vercel.app/",
  withCredentials: true, // Ensure cookies (if used) are sent
});

// Hook to inject token dynamically
const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = user?.token; // Retrieve token from user context
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
