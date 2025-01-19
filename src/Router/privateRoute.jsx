import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate } from "react-router-dom";
import Modal from "../Pages/Login/login";

const PrivateRoute = ({ children, toggleModal }) => {
    const { user } = useContext(AuthContext);

    if (user) {
        return children;  // Render children if the user is logged in
    }

   return toggleModal // Show the login modal if the user is not logged in
    // return <Navigate to="/login" />; // Optional: Navigate to a different route, or show modal directly
};

export default PrivateRoute;
