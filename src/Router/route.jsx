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
import PostDetails from "../Pages/PostDetails/postDetails";
import AdminHome from "../Dashboard/Admin/adminHome/adminHome";
import ManageUsers from "../Dashboard/Admin/manageUsers/manageUsers";

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
      {
        path: 'postDetail/:id',
        element: <PrivateRoute><PostDetails></PostDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/posts/${params.id}`)
      },
    ],
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
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
      {
        path:'adminHome',
        element:<AdminHome></AdminHome>
      },
      {
        path:'manageUser',
        element:<ManageUsers></ManageUsers>
      }
    ],
  },
]);
