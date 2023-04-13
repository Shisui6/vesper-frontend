import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider, RequireAuth } from 'react-auth-kit';
import store from './redux/configureStore';
import App from './App';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import ErrorPage from './error-page';
import './index.css';
import Cars from './components/Cars/Cars';
import AddCar from './components/Cars/AddCar';
import Register from './components/Register/Register';
import DetailsCarScreen from './components/Details/carsDetails';
import ReservationFormNav from './components/Reservation/reservationFormNav';
import ReservedCars from './components/Reservation/ReservedCars';
import DeleteCar from './components/Cars/DeleteCar';

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
        element: (
          <RequireAuth loginPath="/login">
            <Cars />
          </RequireAuth>
        ),
      },
      {
        path: 'addcar',
        element: (
          <RequireAuth loginPath="/login">
            <AddCar />
          </RequireAuth>
        ),
      },
      {
        path: 'deleteCar',
        element: (
          <RequireAuth loginPath="/login">
            <DeleteCar />
          </RequireAuth>
        ),
      },
      {
        path: 'reservations',
        element:
  <RequireAuth loginPath="/login">
    <ReservationFormNav />
  </RequireAuth>,
      },
      {
        path: 'reserved',
        element:
  <RequireAuth loginPath="/login">
    <ReservedCars />
  </RequireAuth>,
      },
      {
        path: 'cars/:id',
        element: (
          <RequireAuth loginPath="/login">
            <DetailsCarScreen />
          </RequireAuth>
        ),
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
