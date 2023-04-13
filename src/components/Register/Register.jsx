import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios, { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UilPrevious, UilSignInAlt } from '@iconscout/react-unicons';
import { useDispatch } from 'react-redux';
import { setNotice } from '../../redux/cars/cars';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    setError('');

    try {
      const response = await axios.post(
        'https://vesper-backend.onrender.com/users',
        { user: values },
      );
      if (response.status === 201) {
        dispatch(setNotice('Account created successfully!'));
        navigate('/login');
      }
    } catch (err) {
      if (err && err instanceof AxiosError) {
        setError(err.response.data.error);
      } else {
        setError(err.message);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit,
  });

  return (
    <main className="w-full flex Login">
      <div className="relative flex-1 hidden pt-36 justify-center h-screen register lg:flex">
        <div className="relative z-10 w-full max-w-md">
          <div className=" mt-16 space-y-3">
            <h3 className="text-white text-3xl font-bold">Ready to start your new journey?</h3>
            <p className="text-gray-300">
              Create your account and start your new journey with us.
            </p>
          </div>
        </div>
        <div
          className="absolute inset-0 my-auto h-[500px]"
          style={{
            background: 'linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)', filter: 'blur(118px)',
          }}
        />
      </div>
      <div className="flex-1 flex pt-36 justify-center h-screen">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          <div className="">
            <div className="mt-5 space-y-2 text-center">
              <h3 className="text-center text-gray-800 text-2xl font-bold sm:text-3xl">Join Us!</h3>
              {error ? <span className=" text-red-900 bg-red-200 rounded-xl font-small mt-10 block w-fit mx-auto px-8 py-1">{error}</span> : ''}
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-5"
          >
            <div>
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                placeholder="Username"
                onChange={formik.handleChange}
                value={formik.values.username}
                name="username"
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                name="password"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-green-600 hover:bg-green-500 active:bg-green-600 rounded-2xl duration-150"
            >
              Register
            </button>
          </form>
          <Link to="/" className="block">
            <button
              type="button"
              className="flex items-center font-medium duration-150 mx-auto hover:text-gray-300"
            >
              Back
              <UilPrevious />
            </button>
          </Link>
          <Link to="/login" className="block">
            <button
              type="button"
              className="flex items-center font-medium duration-150 mx-auto hover:text-gray-300"
            >
              Login
              <UilSignInAlt />
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
