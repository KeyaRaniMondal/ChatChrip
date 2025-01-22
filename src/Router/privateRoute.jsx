import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Modal from "../Pages/Login/login";

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [isModalOpen, setModalOpen] = useState(true); 
    const toggleModal = () => {
        setModalOpen((prev) => !prev);
    };

    if (user) {
        return children; 
    }

    return (
        <>
            <Modal isModalOpen={isModalOpen} toggleModal={toggleModal} />
        </>
    );
};

export default PrivateRoute;

