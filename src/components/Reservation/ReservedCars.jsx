import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReservedCars.css';
import { useAuthHeader } from 'react-auth-kit';

const ReservedCars = () => {
  const [reservedCars, setReservedCars] = useState([]);
  const authHeader = useAuthHeader();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: authHeader(),
      },
    };

    axios.get('http://localhost:3000/api/v1/reservations', config)
      .then((response) => setReservedCars(response.data.reservations))
      .catch((error) => error);
  }, []);

  return (
    <>
      {reservedCars.length === 0 ? (
        <h1 className="no-cars-reserved">No cars reserved at a moment!!</h1>
      ) : (
        <div className="reserved-cars">
          <div className="card-container">
            <header>YOUR CAR RESERVATION DETAILS</header>
            <table>
              <thead>
                <tr>
                  <th>Car Id</th>
                  <th>City</th>
                  <th>Date</th>
                  <th>Duration</th>
                </tr>
              </thead>

              <tbody>
                {Array.from(reservedCars).map((car) => (
                  <tr key={car.id}>
                    <td>{car.id}</td>
                    <td>{car.city}</td>
                    <td>{car.date}</td>
                    <td>{car.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservedCars;
