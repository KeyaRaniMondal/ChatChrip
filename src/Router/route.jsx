import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/home";
import MainLayout from "../Layouts/mainLayout";
import Login from "../Pages/Login/login";
import Register from "../Pages/Home/Registration/register";
import CreatePost from "../Pages/Post/createPost";
import Dashboard from "../Dashboard/dashboard/dashboard";
import PrivateRoute from "./privateRoute";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        children:[
            {
                path:'/',
                element:<Home></Home>,
            },
            {
                path:'postCreation',
                element:<CreatePost></CreatePost>
            }

            // {
            //     path:'register',
            //     element:<Register></Register>
            // }
        ]
    },
    {
        path:'dashboard',
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[

        ]
    }
])