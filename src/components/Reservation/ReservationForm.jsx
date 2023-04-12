import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import {
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
import styles from './ReserveForm.module.css';

const ReservationForm = ({ carId, carMake, year }) => {
  const [reservationData, setReservationData] = useState({
    date: '',
    city: '',
    duration: '',
    car_id: carId,
  });
  const navigate = useNavigate();
  const auth = useAuthUser();
  const authHeader = useAuthHeader();

  const handleDateChange = (e) => {
    setReservationData({ ...reservationData, date: e.target.value });
  };

  const handleCityChange = (e) => {
    setReservationData({ ...reservationData, city: e.target.value });
  };

  const handleDurationChange = (e) => {
    setReservationData({ ...reservationData, duration: e.target.value });
  };
  /* eslint-disable */
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

      if (!response.ok) {
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
 
  return (
    <div className={styles.main}>
      <div className={styles.form_containers}>
        <div className={styles.back_button_div}>
          <span type="button" className={styles.back_button} onClick={() => navigate(-1)}>
            <BsFillArrowLeftCircleFill />
          </span>
        </div>
        <div className={styles.form_wrapper_container}>
          <form onSubmit={handleSubmit} className={styles.formss}>
            <h2 className={styles.header_title}>
              Make reservation for
              {' '}
              {' '}
              {carMake}
              {' '}
              {' '}
              {year}
            </h2>
            <div className={styles.line} />
            <p className={styles.info}>
              There are 34 different versions of the Vespa. Today five series are in production:
              the classic manual transmission PX and the modern CVT transmission S, LX, GT, and GTS.
              We have showrooms all over the globe which some include test-riding facilities.
              If you wish to find out if a
              test-ride, please make reservation.
            </p>
            <div className={styles.input_wrappers}>
              <input
                type="text"
                id="username"
                name="username"
                value={auth().username}
                readOnly
                className={styles.form_inputs}
              />
            </div>
            <div className={styles.input_wrappers}>
              <input
                type="text"
                id="name"
                name="name"
                value={carMake}
                readOnly
                className={styles.form_inputs}
              />
            </div>
            <div className={styles.input_wrappers}>
              <input
                type="date"
                id="date"
                name="date"
                onChange={handleDateChange}
                className={styles.form_inputs}
                placeholder="Date"
              />
            </div>
            <div className={styles.input_wrappers}>
              <input
                type="text"
                id="city"
                name="city"
                onChange={handleCityChange}
                className={styles.form_inputs}
                placeholder="City"
              />
            </div>
            <div className={styles.input_wrappers}>
              <input
                type="number"
                id="duration"
                name="duration"
                onChange={handleDurationChange}
                required
                className={styles.form_inputs}
                placeholder="Duration"
              />
            </div>
            <button type="submit" className={styles.form_submit} onClick={() => navigate(-1)}><div className={styles.text_res}>Reserve</div></button>
          </form>
        </div>
      </div>
    </div>
  );
};
 /* eslint-enable */
ReservationForm.propTypes = {
  carId: PropTypes.number.isRequired,
  carMake: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

export default ReservationForm;
