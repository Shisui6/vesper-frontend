import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { DateInput } from '@mantine/dates';
import {
  fetchCars, selectCars, selectIsLoading, selectSelectedCar,
} from '../../redux/cars/cars';

const ReservationFormNav = () => {
  const [reservationData, setReservationData] = useState({
    city: '',
    duration: '',
    car_id: '',
  });
  const [date, setDate] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const authentication = authHeader();
  const cars = useSelector(selectCars);
  const selectedCar = useSelector(selectSelectedCar);
  const loading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchCars(authentication));
  }, [authentication, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData({ ...reservationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reservationData.car) {
      reservationData.car_id = reservationData.car.split(',');
    }

    try {
      const response = await axios.post('https://vesper-backend.onrender.com/api/v1/reservations', {
        reservation: {
          date: date.toISOString().substring(0, 10),
          car_name: selectedCar ? selectedCar.name : reservationData.car_id[1],
          city: reservationData.city,
          duration: parseInt(reservationData.duration, 10),
          user_id: auth().id,
          car_id: selectedCar ? selectedCar.id : reservationData.car_id[0],
        },
      }, {
        headers: {
          Authorization: authHeader(),
        },
      });

      if (response.status === 201) {
        navigate('/reserved');
      }

      setReservationData({
        city: '',
        duration: '',
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="reserve h-[95vh] my-4 mr-4 rounded-2xl pt-20 md:pt-36 relative fade-in">
      <div className="text-center mb-6 md:mb-0">
        <h1 className="text-5xl font-medium mb-4">Book, drive, repeat</h1>
        <p>Find and book your next car</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white w-[85%] md:h-24 rounded-2xl md:absolute md:bottom-16 md:left-0 md:right-0 md:m-auto md:flex-row flex flex-col p-7 gap-5 my-0 mx-auto">
        {selectedCar ? (
          <input
            type="text"
            id="name"
            name="name"
            value={`${selectedCar.name} ${selectedCar.model}`}
            readOnly
            className="bg-[#f8f8f8] p-2 rounded-xl md:w-[25%]"
          />
        ) : (
          <select
            id="car"
            name="car"
            onChange={handleChange}
            required
            className="bg-[#f8f8f8] p-2 rounded-xl md:w-[25%]"
          >
            <option value="">{loading ? 'Loading...' : 'Select a car'}</option>
            {cars.map((car) => (
              <option value={[car.id, car.name]} key={car.id}>
                {car.name}
                {' '}
                {car.model}
              </option>
            ))}
          </select>
        )}
        <DateInput
          value={date}
          minDate={new Date()}
          onChange={setDate}
          placeholder="Date"
          maw={400}
          mx="auto"
        />
        <input
          type="text"
          id="city"
          name="city"
          onChange={handleChange}
          className="bg-[#f8f8f8] p-2 rounded-xl md:w-1/4"
          placeholder="City"
        />
        <input
          type="number"
          id="duration"
          min={1}
          name="duration"
          onChange={handleChange}
          required
          className="bg-[#f8f8f8] p-2 rounded-xl md:w-[25%]"
          placeholder="Duration in days"
        />
        <button type="submit" className="bg-[#181818] text-white p-2 rounded-xl hover:bg-[#2c2c2c] duration-150">Reserve</button>
      </form>
    </div>
  );
};

export default ReservationFormNav;
