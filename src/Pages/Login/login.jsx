import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { RxCross1 } from "react-icons/rx";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../shared/useAxiosPublic";
import Swal from "sweetalert2";

const Modal = ({ isModalOpen, toggleModal }) => {
  const axiosPublic=useAxiosPublic()
  const { signIn, createUser,updateUserProfile } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Email is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address.";
      }
      if (!values.password) {
        errors.password = "Password is required.";
      } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
      }
      if (!isLogin && !values.username) {
        errors.username = "Username is required for registration.";
      }
      return errors;
    },
    onSubmit: (values) => {
      if (isLogin) {
        // Login
        signIn(values.email, values.password)
          .then((result) => {
            console.log("Logged in user:", result.user);
            Swal.fire({
              title: 'User Login Successful.',
              showClass: {
                  popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
              }
          });
            toggleModal();
          })
          .catch((error) => {
            console.error("Login error:", error);
          });
      } else {
        // Registration
        createUser(values.email, values.password)
          .then((result) => {
            // const loggedUser=result.user;
            console.log("Registered user:", result.user);
            updateUserProfile(values.username)
            .then(()=>{
              console.log('profile updated')
              const userInfo={
                username:values.username,
                email:values.email
              }
              axiosPublic.post('/users',userInfo)
              .then(res=>{ 
                if(res.data.insertedId)
                {
                  console.log('user added to database')
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                  toggleModal();
                }
            })
           
            })

          })
          .catch((error) => {
            console.error("Registration error:", error);
          });
      }
    },
  });

  if (!isModalOpen) return null;

  return (
    <div className="modal modal-open fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-box w-11/12 max-w-md bg-white p-6 rounded shadow-lg">
        <div className="flex justify-end">
          <button
            className="text-red-700 font-bold text-lg"
            onClick={toggleModal}
          >
            <RxCross1 />
          </button>
        </div>
        <h3 className="text-xl text-center font-bold mb-4">
          {isLogin ? "Login" : "Register"} Now!!
        </h3>
        <form onSubmit={handleSubmit}>
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
              {errors.username && touched.username && (
                <div className="text-red-500 text-sm">{errors.username}</div>
              )}
            </div>
          )}
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
            {errors.email && touched.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>
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
            {errors.password && touched.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full rounded-full">
              {isLogin ? "Sign in" : "Sign up"}
            </button>
          </div>
        </form>
        <button
          className="btn w-full rounded-full mt-3 flex items-center justify-center"
          onClick={() => console.log("Google Sign-In placeholder")}
        >
          <FcGoogle className="w-8 h-8 mr-2" />
          Continue with Google
        </button>
        <p className="text-center mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button className="text-blue-500 underline" onClick={toggleForm}>
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Modal;
