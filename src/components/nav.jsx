import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";
import Modal from "../Pages/Login/login";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext)

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => console.log(error))
  }
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const links = (
    <>
      <NavLink to={"/"} className="btn btn-ghost">
        Home
      </NavLink>
      <NavLink to={"/membership"} className="btn btn-ghost">
        Membership
      </NavLink>

    </>
  );

  return (
    <div className="navbar bg-gradient-to-r from-[#4B5945] to-[#FFB200] mt-1">
      <div className="navbar-start">
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            role="button"
          >
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
        <ul className="menu menu-horizontal gap-5 text-lg">{links}</ul>
      </div>
      <Modal isModalOpen={isModalOpen} toggleModal={toggleModal} />
      <div className="navbar-end">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <button className="btn btn-ghost btn-circle">
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
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        {/* Toggle between user profile and login button */}
        {
          user ?
            <>
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Avatar"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </button>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">
                      {user?.displayName||'Anonymous'}
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Dashboard</a>
                  </li>
                  <li>
                    <button onClick={handleLogOut}>Logout</button>
                  </li>
                </ul>
              </div>
            </> :
            <>
              <button className="btn bg-gradient-to-r from-[#e02e16] to-[#825cda] mt-1 rounded-full text-white font-bold " onClick={toggleModal}>
                Join Us
              </button>
            </>
        }
      </div>
    </div>
  );
};

export default Navbar;
