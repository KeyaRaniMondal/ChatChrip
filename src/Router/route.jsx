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
import Membership from "../Pages/Member/membership";
import Announcement from "../Dashboard/Announcement/announcement";
import Activities from "../Dashboard/Admin/Activities/activities";
import CommentsPage from "../Pages/PostDetails/commentPage";
import AdminRoute from "./adminRoute";

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
        element: <PrivateRoute><CreatePost></CreatePost></PrivateRoute>
      },
      {
        path: 'membership',
        element: <PrivateRoute><Membership></Membership></PrivateRoute>
      },
      {
        path: 'postDetail/:id',
        element: <PrivateRoute><PostDetails></PostDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/posts/${params.id}`,{credentials:'include'})
      },
      {
        path: 'comments/:postId',
        element: <PrivateRoute><CommentsPage /></PrivateRoute>
      }
      
    ],
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'addPost',
        element: <PrivateRoute><AddPost></AddPost></PrivateRoute>,
      },
      {
        path: 'profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: 'myPost',
        element: <PrivateRoute><MyPost></MyPost></PrivateRoute>
      },
      {
        path:'adminHome',
        element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path:'manageUser',
        element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path:'announcement',
        element:<AdminRoute><Announcement></Announcement></AdminRoute>
      },
      {
        path:'reportedActivities',
        element:<AdminRoute><Activities></Activities></AdminRoute>
      }
    ],
  },
]);
