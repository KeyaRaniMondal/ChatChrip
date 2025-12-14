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
    <div className="min-h-screen mt-20 ">
      <Navbar />
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col p-4 ">
          {/* Drawer toggle button for mobile */}
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden w-fit self-end mb-4">
            Open Menu
          </label>
          <Outlet />
        </div>

        <div className="drawer-side mt-14 lg:mt-0">

          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-300 text-base-content min-h-full w-80 p-4 overflow-y-auto ">
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/adminHome">
                    <MdAdminPanelSettings className="text-2xl" /> Admin Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageUser">
                    <FaUsers className="text-2xl" /> Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/reportedActivities">
                    <RxActivityLog className="text-2xl" /> Activities
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/announcement">
                    <TfiAnnouncement className="text-2xl" /> Make Announcement
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/profile">
                    <FaUserShield className="text-2xl" /> My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profileOverview">
                    <FaUserShield className="text-2xl" /> Profile Overview
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addPost">
                    <MdPostAdd className="text-2xl" /> Add Post
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myPost">
                    <FaUserPen className="text-2xl" /> My Posts
                  </NavLink>
                </li>
              </>
            )}

            {/* Common navigation */}
            <div className="divider" />
            <li>
              <NavLink to="/messages">
                <MdMessage className="text-2xl" /> Messages
              </NavLink>
            </li>
            <li>
              <NavLink to="/create-ad">
                <IoIosCreate className="text-2xl" /> Create Ad
              </NavLink>
            </li>
            <li>
              <NavLink to="/monetize">
                <MdOutlineMonetizationOn className="text-2xl" /> Monetize
              </NavLink>
            </li>
            <li>
              <NavLink to="/bookmarks">
                <IoIosBookmark className="text-2xl" /> Bookmarks
              </NavLink>
            </li>
            <li>
              <NavLink to="/help">
                <IoIosHelpCircle className="text-2xl" /> Help
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
