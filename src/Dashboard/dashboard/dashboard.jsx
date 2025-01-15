import { FaSignsPost, FaUserPen, FaUserShield } from "react-icons/fa6"
import Navbar from "../../components/nav"
import { MdPostAdd } from "react-icons/md"

const Dashboard = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                        Open drawer
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-300 text-base-content min-h-full w-80 p-4">
                        <li><a><FaUserShield />My Profile</a></li>
                        <li><a><MdPostAdd />Add Post</a></li>
                        <li><a><FaUserPen />My Post</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Dashboard