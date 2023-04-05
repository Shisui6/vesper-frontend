import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider, RequireAuth } from 'react-auth-kit';
import store from './redux/configureStore';
import App from './App';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import ErrorPage from './error-page';
import './index.css';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Register/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'dashboard',
        element:
  <RequireAuth loginPath="/login">
    <Dashboard />
  </RequireAuth>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider
        authType="cookie"
        authName="_auth"
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
);
