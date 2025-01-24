import logo from "../assets/logo.jpg";
import Modal from "../Pages/Login/login";
import { useContext, useEffect, useState } from "react";
import { useAnnouncement } from "../hooks/announcementContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "../shared/useAxiosSecure";
import { FaHome } from "react-icons/fa";
import { MdCardMembership } from "react-icons/md";

const Navbar = () => {
  const { announcementCount } = useAnnouncement();
  const [isModalOpen, setModalOpen] = useState(false);
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()

  const handleLogOut = () => {
    logOut()
      .then(() => navigate('/'))
      .catch((error) => console.log(error));
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axiosSecure.get("/announcements");
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, [axiosSecure]);

  const links = (
    <>
      <NavLink to={"/"} className="btn btn-ghost">
      <FaHome className="text-xl"/> Home
      </NavLink>
      <NavLink to={"/membership"} className="btn btn-ghost">
      <MdCardMembership className="text-xl"/>
      Membership
      </NavLink>
    </>
  );

  return (
    <div className="navbar bg-gradient-to-r from-[#4B5945] to-[#FFB200] mt-1 lg:px-20">
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden" role="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-14 h-16 -mt-2 ml-5" />
          <span className="btn btn-ghost text-lg -ml-4">ChatChirp</span>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-5 text-lg">
          {links}
        </ul>
      </div>
      <Modal isModalOpen={isModalOpen} toggleModal={toggleModal} />
      <div className="navbar-end">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setShowAnnouncements(!showAnnouncements)}
        >
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            {announcementCount > 0 && (
              <span className="badge badge-xs badge-primary indicator-item">
                {announcementCount}
              </span>
            )}
          </div>
        </button>
        {showAnnouncements && (
          <div className="absolute top-16 right-5 w-80 bg-white shadow-lg rounded-md p-4 z-50">
            <h3 className="text-lg font-bold mb-2">Announcements</h3>
            {announcementCount > 0 ? (
              <ul className="list-disc pl-5">
                {announcements.map((announcement) => (
                  <li key={announcement._id} className="mb-2">
                    <strong>{announcement.title}</strong>
                    <p>{announcement.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No announcements available.</p>
            )}
            <button
              className="btn btn-sm btn-primary mt-3"
              onClick={() => setShowAnnouncements(false)}
            >
              Close
            </button>
          </div>
        )}
        {user ? (
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Avatar" src={user?.photoURL} />
              </div>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  {user?.displayName || "Anonymous"}
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <Link to="dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <button
            className="btn bg-gradient-to-r from-[#e02e16] to-[#825cda] mt-1 rounded-full text-white font-bold"
            onClick={toggleModal}
          >
            Join Us
          </button>
        )}
      </div>
    </div>
  );
};
export default Navbar

