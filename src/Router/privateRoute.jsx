import { useContext } from "react"
import { AuthContext } from "../Providers/AuthProvider"
import { Navigate } from "react-router-dom"

const PrivateRoute=({children,toggleForm})=>{
    const{user,loading}=useContext(AuthContext)
    if(user)
    {
        return children
    }
    return <Navigate to={toggleForm}></Navigate>
}
export default PrivateRoute