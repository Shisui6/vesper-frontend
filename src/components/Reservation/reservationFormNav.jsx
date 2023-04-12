import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReservationsFormNav.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import {
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
import { fetchCars } from '../../redux/cars/cars';
import Loader from '../Loader/Loader';

const ReservationFormNav = () => {
  const [reservationData, setReservationData] = useState({
    date: '',
    city: '',
    duration: '',
    car_id: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const [loading, setLoading] = useState(true);
  const cars = useSelector((state) => state.cars);

  /* eslint-disable */
  useEffect(() => {
    dispatch(fetchCars(authHeader()));
    setTimeout(() => {
      setLoading(false);
    }, 3800);
  }, [dispatch]);
  
  if (loading) {
    return <Loader />;
  }

  const handleCarChange = (e) => {
    setReservationData({ ...reservationData, car_id: e.target.value });
  };

  const handleDateChange = (e) => {
    setReservationData({ ...reservationData, date: e.target.value });
  };

  const handleCityChange = (e) => {
    setReservationData({ ...reservationData, city: e.target.value });
  };

  const handleDurationChange = (e) => {
    setReservationData({ ...reservationData, duration: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/reservations', {
        date: reservationData.date,
        city: reservationData.city,
        duration: parseInt(reservationData.duration, 10),
        user_id: auth().id,
        car_id: parseInt(reservationData.car_id, 10),
      }, {
        headers: {
          Authorization: authHeader(),
        },
      });

      if (response.status !== 200) {
        throw new Error('Error creating reservation');
      }

      setReservationData({
        date: '',
        city: '',
        duration: '',
      });
    } catch (error) {
      return error;
    }
  };
  /* eslint-enable */
  return (
    <div className="forms-container">
      <div className="back-button-div">
        <button type="button" className="back-button" onClick={() => navigate(-1)}>
          <BsFillArrowLeftCircleFill />
        </button>
      </div>
      <div className="form-wrapper-container">
        <form onSubmit={handleSubmit} className="forms">
          <h2 className="headers-title">Reserve a car</h2>
          <div className="lines" />
          <p className="infos">
            There are 34 different versions of the Vespa. Today five series are in production:
            the classic manual transmission PX and the modern CVT transmission S, LX, GT, and GTS.
            We have showrooms all over the globe which some include test-riding facilities.
            If you wish to find out if a
            test-ride, please make reservation.
          </p>
          <div className="input-wrapper">
            <input
              type="text"
              id="username"
              name="username"
              value={auth().username}
              readOnly
              className="form-input"
              placeholder="Username"
            />
          </div>
          <div className="input-wrapper">
            <select
              id="car"
              name="car"
              onChange={handleCarChange}
              required
              className="select-fom"
            >
              <option value="">Select a car</option>
              {Array.from(cars.cars).map((car) => (
                <option value={car.id} key={car.id}>
                  {car.name}
                  {' '}
                  {car.model}
                </option>
              ))}
            </select>
          </div>
          <div className="input-wrapper">
            <input
              type="date"
              id="date"
              name="date"
              onChange={handleDateChange}
              className="form-input"
              placeholder="Date"
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              id="city"
              name="city"
              onChange={handleCityChange}
              className="form-input"
              placeholder="City"
            />
          </div>
          <div className="input-wrapper">
            <input
              type="number"
              id="duration"
              name="duration"
              onChange={handleDurationChange}
              required
              className="form-input"
              placeholder="Duration"
            />
          </div>
          <button type="submit" className="form-submit" onClick={() => navigate(-1)}><div className="text-res">Reserve</div></button>
        </form>
      </div>
    </div>
  );
};

export default ReservationFormNav;
