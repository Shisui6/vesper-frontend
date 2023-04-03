/* eslint-disable import/no-extraneous-dependencies */
import { UilPrevious } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';

const Login = () => (
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
          <div className="mt-5 space-y-2">
            <h3 className="text-center text-gray-800 text-2xl font-bold sm:text-3xl">Welcome Back!</h3>
          </div>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-5"
        >
          <div>
            <input
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              placeholder="Username"
            />
          </div>
          <button
            type="button"
            className="w-full px-4 py-2 text-white font-medium bg-green-600 hover:bg-green-500 active:bg-green-600 rounded-2xl duration-150"
          >
            Login
          </button>
        </form>
        <Link to="/" className="block">
          <button
            type="button"
            className="flex items-center justify-center px-4 w-full py-2 text-white font-medium bg-gray-600 hover:bg-gray-500 active:bg-gray-600 rounded-2xl duration-150"
          >
            Back
            <UilPrevious />
          </button>
        </Link>
      </div>
    </div>
  </main>
);

export default Login;
