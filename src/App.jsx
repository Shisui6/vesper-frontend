import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useIsAuthenticated } from 'react-auth-kit';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  const isAuthenticated = useIsAuthenticated();
  const [windowDimension, setWindowDimension] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setWindowDimension(window.innerWidth);
    setAuthenticated(isAuthenticated());
  }, [location.pathname]);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const margin = () => {
    if (authenticated && location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register') {
      if (windowDimension > 768) {
        return { marginLeft: '14.5rem' };
      }

      return { marginLeft: '4rem' };
    }

    return {};
  };

  const navbar = () => {
    if (authenticated && location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register') {
      return <Navbar />;
    }

    return '';
  };

  return (
    <>
      {navbar()}

      <div id="detail" style={margin()}>
        <Outlet />
      </div>
    </>
  );
};

export default App;
