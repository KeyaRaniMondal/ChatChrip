import React, { useState } from "react";
import { useFormik } from "formik";

const Modal = ({ isModalOpen, toggleModal }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // Formik for form handling
  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    onSubmit: (values) => {
      if (isLogin) {
        console.log("Logging in with:", values);
      } else {
        console.log("Registering with:", values);
      }
    },
  });
  if (!isModalOpen) return null;
  return (
    <>
      <div className="modal modal-open fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="modal-box w-11/12 max-w-md bg-white p-6 rounded shadow-lg">
          <div className="flex justify-end" >
            <button className='text-red-700 font-bold text-lg' onClick={toggleModal}>X</button>
          </div>
          <h3 className="text-xl text-center font-bold mb-4">
            {isLogin ? "Login" : "Register"} Now!!
          </h3>
          <form onSubmit={handleSubmit}>
            {/* Username Field for Registration */}
            {!isLogin && (
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="input input-bordered w-full"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            )}
            {/* Email Field */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {/* Password Field */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered w-full"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                {isLogin ? "Sign in" : "sign up"}
              </button>
            </div>
          </form>
          {/* Toggle Between Login and Registration */}
          <p className="text-center mt-4">
            {isLogin
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              className="text-blue-500 underline"
              onClick={toggleForm}
            >
              {isLogin ? "sign up" : "sign in"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Modal;
