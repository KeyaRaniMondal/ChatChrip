import { Outlet } from "react-router-dom"
import Navbar from "../components/nav"
import Footer from "../components/footer"

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>

    )
}
export default MainLayout