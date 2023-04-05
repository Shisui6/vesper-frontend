import React from 'react';
import { Outlet } from 'react-router-dom';
import { useIsAuthenticated } from 'react-auth-kit';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  const isAuthenticated = useIsAuthenticated();
  const applyStyle = isAuthenticated() ? { marginLeft: '14.5rem' } : {};

  return (
    <>
      {isAuthenticated() && <Navbar />}

      <div id="detail" style={applyStyle}>
        <Outlet />
      </div>
    </>
  );
};

export default App;
