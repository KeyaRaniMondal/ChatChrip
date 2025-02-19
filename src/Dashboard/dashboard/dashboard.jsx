import { FaSignsPost, FaUserPen, FaUserShield } from "react-icons/fa6";
import Navbar from "../../components/nav";
import { MdAdminPanelSettings, MdMessage, MdOutlineMonetizationOn, MdPostAdd } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { FaUsers } from "react-icons/fa";
import { RxActivityLog } from "react-icons/rx";
import { IoIosBookmark, IoIosCreate, IoIosHelpCircle } from "react-icons/io";
import { TfiAnnouncement } from "react-icons/tfi";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  return (
    <div className="mt-20">
      <Navbar></Navbar>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label>
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-300 text-base-content min-h-full w-80 p-4">
            {
              isAdmin ?
                <>
                  <li>
                    <NavLink to="/dashboard/adminHome">
                      <MdAdminPanelSettings className="text-2xl"/> Admin Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manageUser">
                      <FaUsers className="text-2xl"/> Manage Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/reportedActivities">
                    <RxActivityLog className="text-2xl"/> Activities
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/announcement">
                    <TfiAnnouncement className="text-2xl"/>Make Announcement
                    </NavLink>
                  </li>
                </>
               :  
                <>
                  <li>
                    <NavLink to="/dashboard/profile">
                      <FaUserShield className="text-2xl"/> My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/profileOverview">
                      <FaUserShield className="text-2xl"/>Profile Overview
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/addPost">
                      <MdPostAdd className="text-2xl"/> Add Post
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/myPost">
                      <FaUserPen className="text-2xl"/> My Posts
                    </NavLink>
                  </li>
                </>
           }  

        <li className="mt-32">    <NavLink to="/.">
        <MdMessage className="text-2xl"/>Messages
                    </NavLink></li>
        <li>    <NavLink to="/..">
        <IoIosCreate className="text-2xl"/>Create Add
                    </NavLink></li>
        <li>    <NavLink to="/...">
        <MdOutlineMonetizationOn className="text-2xl"/>Monetize
                    </NavLink></li>
        <li>    <NavLink to="/...">
        <IoIosBookmark className="text-2xl"/>BookMarks
                    </NavLink></li>
        <li>    <NavLink to="/....">
        <IoIosHelpCircle className="text-2xl"/>Help
                    </NavLink></li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
