import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/home";
import MainLayout from "../Layouts/mainLayout";
import Login from "../Pages/Login/login";
import Register from "../Pages/Home/Registration/register";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        children:[
            {
                path:'/',
                element:<Home></Home>,
                // children:[
                //     {
                //         path:'login',
                //         element:<Login></Login>
                //     },
                // ]
            },

            {
                path:'register',
                element:<Register></Register>
            }
        ]
    }
])