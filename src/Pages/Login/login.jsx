import React from 'react';
import { Formik, useFormik } from 'formik';
import Register from '../Home/Registration/register';
import { NavLink } from 'react-router-dom';

const Login = ({ isModalOpen, toggleModal }) => {
  const { values, handleBlur, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
  });

  if (!isModalOpen) return null; 

  return (
    <div className="modal modal-open" role="dialog">
      <div className="modal-box">
        <div className="flex justify-end" >
          <button className='text-red-700 font-bold text-lg' onClick={toggleModal}>X</button>
        </div>
        <h3 className="text-lg font-bold text-center">Login</h3>


        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
          <h1>Don't have an Account ? <NavLink to={'/register'}>Sign Up</NavLink ></h1>
        </form>
      </div>
    </div>
  );
};

export default Login;



