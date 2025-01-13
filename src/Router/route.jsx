import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/home";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<Home></Home>
    }
])