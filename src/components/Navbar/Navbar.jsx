import { NavLink, useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import {
  UilCarSideview,
  UilPlus,
  UilBook,
  UilPlusCircle,
  UilTrashAlt, UilSignout, UilFacebook, UilInstagram, UilLinkedin, UilSlack, UilTwitter,
} from '@iconscout/react-unicons';

const Navbar = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    signOut();
    navigate('/');
  };

  return (
    <nav className="Navbar absolute left-0 h-screen w-52 shadow-lg flex flex-col justify-between py-10 px-4">
      <div className="flex items-center justify-between">
        <h2 className=" font-extrabold tracking-wide text-2xl">Vesper</h2>
        <img src="/profile.png" alt="profile" className=" w-10 h-10" />
      </div>
      <ul>
        <li>
          <NavLink to="/cars" className="Navlink flex gap-2 p-3 rounded-xl mb-2 text-sm items-center cursor-pointer hover:text-white duration-100" style={({ isActive }) => (isActive ? { backgroundColor: '#97bf0f', color: '#fff' } : '')}>
            <UilCarSideview />
            Cars
          </NavLink>
        </li>
        <li>
          <NavLink to="login" className="Navlink flex gap-2 p-3 rounded-xl mb-2 text-sm items-center cursor-pointer hover:text-white duration-100" style={({ isActive }) => (isActive ? { backgroundColor: '#97bf0f', color: '#fff' } : {})}>
            <UilPlus />
            New Reservation
          </NavLink>
        </li>
        <li>
          <NavLink to="login" className="Navlink flex gap-2 p-3 rounded-xl mb-2 text-sm items-center cursor-pointer hover:text-white duration-100" style={({ isActive }) => (isActive ? { backgroundColor: '#97bf0f', color: '#fff' } : {})}>
            <UilBook />
            My Reservations
          </NavLink>
        </li>
        <li>
          <NavLink to="login" className="Navlink flex gap-2 p-3 rounded-xl mb-2 text-sm items-center cursor-pointer hover:text-white duration-100" style={({ isActive }) => (isActive ? { backgroundColor: '#97bf0f', color: '#fff' } : {})}>
            <UilPlusCircle />
            Add Car
          </NavLink>
        </li>
        <li>
          <NavLink to="login" className="Navlink flex gap-2 p-3 rounded-xl mb-2 text-sm items-center cursor-pointer hover:text-white duration-100" style={({ isActive }) => (isActive ? { backgroundColor: '#97bf0f', color: '#fff' } : {})}>
            <UilTrashAlt />
            Delete Car
          </NavLink>
        </li>
        <li className="Navlink flex gap-2 p-3 rounded-xl mb-2 text-sm items-center cursor-pointer hover:text-white duration-100">
          <button type="button" onClick={logout} className="flex items-center gap-2">
            <UilSignout />
            Logout
          </button>
        </li>
      </ul>
      <div className="text-center">
        <ul className="flex justify-between px-3 mb-4 text-gray-500">
          <li><UilFacebook /></li>
          <li><UilInstagram /></li>
          <li><UilLinkedin /></li>
          <li><UilSlack /></li>
          <li><UilTwitter /></li>
        </ul>
        <p className="text-xs">Copyright &copy;. All rights reserved</p>
      </div>
    </nav>
  );
};

export default Navbar;
