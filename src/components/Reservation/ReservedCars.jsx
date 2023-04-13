import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReservedCars.css';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import Loader from '../Loader/Loader';

const ReservedCars = () => {
  const [reservedCars, setReservedCars] = useState([]);
  const authHeader = useAuthHeader();
  const authentication = authHeader();
  const auth = useAuthUser();
  const authData = auth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: authentication,
      },
      params: {
        id: authData.id,
      },
    };

    axios.get('http://localhost:3000/api/v1/reservations', config)
      .then((response) => setReservedCars(response.data.reservations))
      .catch((error) => error);

    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, [authData.id, authentication]);

  if (loading) {
    return <Loader speed={2} />;
  }

  if (Array.from(reservedCars).length === 0) {
    return (
      <section className="py-14 fade-in">
        <div className="max-w-screen-xl mx-auto px-4 text-center md:px-8">
          <div className="max-w-xl mx-auto">
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              YOUR CAR RESERVATION DETAILS
            </h3>
          </div>
          <div className="mt-24 flex justify-center items-center flex-col">
            <img src="/empty.png" alt="empty" className="w-24 h-24 mb-5" />
            <h2>No reservations saved. Please make a reservation to see it here</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="reserved-cars">
      <div className="card-container">
        <header>YOUR CAR RESERVATION DETAILS</header>
        <table>
          <thead>
            <tr>
              <th>Car</th>
              <th>City</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>

          <tbody>
            {Array.from(reservedCars).map((car) => (
              <tr key={car.id}>
                <td>{car.car_name}</td>
                <td>{car.city}</td>
                <td>{car.date}</td>
                <td>
                  {car.duration}
                  {' '}
                  days
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservedCars;
