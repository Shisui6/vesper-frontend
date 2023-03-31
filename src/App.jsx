import React from 'react';
import { Outlet } from 'react-router-dom';

const App = () => (
  <div id="detail">
    <Outlet />
  </div>
);

export default App;
