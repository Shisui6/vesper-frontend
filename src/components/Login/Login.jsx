import React, { useState } from 'react';
import { useSignIn } from 'react-auth-kit';
import { useFormik } from 'formik';
import axios, { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UilPrevious, UilRegistered } from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotice, setUsername, setId } from '../../redux/user/user';

const Login = () => {
  const [error, setError] = useState('');
  const notice = useSelector(selectNotice);
  const dispatch = useDispatch();
  const signIn = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:3000/auth/login',
        values,
      );

      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: 'Bearer',
        authState: { username: values.username },
      });

      setTimeout(() => {
        dispatch(setUsername(response.data.user.username));
        dispatch(setId(response.data.user.id));
        navigate('/dashboard');
      }, 1000);
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

  const handleNotice = () => {
    if (error) {
      return <span className=" text-red-900 bg-red-200 rounded-xl font-small mt-10 block w-fit mx-auto px-8 py-1">{error}</span>;
    } if (notice) {
      return <span className="text-green-900 bg-green-200 rounded-xl font-small mt-10 block w-fit mx-auto px-8 py-1">{notice}</span>;
    }
    return '';
  };

  return (
    <main className="w-full flex Login">
      <div className="relative flex-1 hidden pt-36 justify-center h-screen login lg:flex">
        <div className="relative z-10 w-full max-w-md">
          <div className=" mt-16 space-y-3">
            <h3 className="text-white text-3xl font-bold">Become a member of our sharing community</h3>
            <p className="text-gray-300">
              Login to your account and get access to all features.
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
              <h3 className="text-center text-gray-800 text-2xl font-bold sm:text-3xl">Welcome Back!</h3>
              {handleNotice()}
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
              Login
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
          <Link to="/register" className="block">
            <button
              type="button"
              className="flex items-center font-medium duration-150 mx-auto hover:text-gray-300"
            >
              Sign up
              <UilRegistered />
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
