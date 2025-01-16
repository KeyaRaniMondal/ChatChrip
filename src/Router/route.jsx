import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/home";
import MainLayout from "../Layouts/mainLayout";
import Login from "../Pages/Login/login";
import Register from "../Pages/Home/Registration/register";

import Dashboard from "../Dashboard/dashboard/dashboard";
import PrivateRoute from "./privateRoute";

import AddPost from "../Dashboard/Post/AddPost";
import Profile from "../Dashboard/Profile/profile";
import CreatePost from "../Dashboard/Post/createPost";
import MyPost from "../Dashboard/Post/myPost";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: 'postCreation',
        element: <CreatePost></CreatePost>,
      },

    ],
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'addPost',
        element: <AddPost></AddPost>,
      },
      {
        path: 'profile',
        element: <Profile></Profile>
      },
      {
        path: 'myPost',
        element: <MyPost></MyPost>
      },
    ],
  },
]);
