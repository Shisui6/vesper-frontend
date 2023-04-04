import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';

const Dashboard = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    signOut();
    navigate('/');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button type="button" onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
