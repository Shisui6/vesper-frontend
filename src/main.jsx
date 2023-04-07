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
import Cars from './components/Cars/Cars';
import Register from './components/Register/Register';
import DetailsCarScreen from './components/Details/carsDetails';

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
        path: 'cars',
        element:
  <RequireAuth loginPath="/login">
    <Cars />
  </RequireAuth>,
      },
      {
        path: 'car',
        element:
  <RequireAuth loginPath="/login">
    <DetailsCarScreen />
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
