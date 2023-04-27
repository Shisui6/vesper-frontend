/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
  deleteReservation, fetchReservations, removeReservation, selectReservations,
} from '../../redux/reservations/reservations';
import CarSkeleton from '../Cars/CarSkeleton';
import { fetchCars, selectCars, selectIsLoading } from '../../redux/cars/cars';
import Modal from '../Modal/Modal';

const ReservedCars = () => {
  const dispatch = useDispatch();
  const authHeader = useAuthHeader();
  const authentication = authHeader();
  const auth = useAuthUser();
  const authData = auth();
  const [animationParent] = useAutoAnimate();
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState({});
  const cars = useSelector(selectCars);
  const loading = useSelector(selectIsLoading);
  const reservations = useSelector(selectReservations);

  useEffect(() => {
    dispatch(fetchCars(authentication));
    const config = {
      headers: {
        Authorization: authentication,
      },
      params: {
        id: authData.id,
      },
    };
    dispatch(fetchReservations(config));
  }, [authData.id, authentication, dispatch]);

  const handleDelete = (reservation) => {
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    const data = {
      id: selectedReservation.id,
      auth: authentication,
    };

    dispatch(deleteReservation(data));
    setShowModal(false);
    dispatch(removeReservation(selectedReservation.id));
  };

  if (loading) {
    return (
      <section className="py-14 fade-in">
        <div className="max-w-screen-xl mx-auto px-4 text-center md:px-8">
          <div className="max-w-xl mx-auto">
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Manage Your Reservations
            </h3>
            <p className="text-gray-600 mt-2 text-xs">
              View and cancel your reservations below.
            </p>
          </div>
          <div className="mt-12">
            <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3" ref={animationParent}>
              <CarSkeleton />
              <CarSkeleton />
              <CarSkeleton />
            </ul>
          </div>
        </div>
      </section>
    );
  }

  if (reservations.length === 0) {
    return (
      <section className="py-14 fade-in">
        <div className="max-w-screen-xl mx-auto px-4 text-center md:px-8">
          <div className="max-w-xl mx-auto">
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Manage Your Reservations
            </h3>
            <p className="text-gray-600 mt-2 text-xs">
              View and cancel your reservations below.
            </p>
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
    <>
      <section className="py-14 fade-in">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="max-w-xl text-center mx-auto">
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Manage Your Reservations
            </h3>
            <p className="text-gray-600 mt-2 text-xs">
              View and cancel your reservations below.
            </p>
          </div>
          <div className="mt-12">
            <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {reservations.map((reservation) => (
                <li key={reservation.id} className="rounded-xl shadow-md pb-6">
                  <div className="h-60">
                    <img
                      src={`/${cars.find((car) => car.id === reservation.car_id).image}`}
                      className="w-full h-full rounded-t-xl"
                      alt=""
                    />
                  </div>
                  <div className="mt-2 px-6">
                    <div className="flex justify-between mt-3 items-center">
                      <h4 className=" text-[#353537] font-semibold sm:text-lg">
                        Name:
                      </h4>
                      <p className="font-semibold text-[#b3b7c5] text-[15px]">
                        {reservation.car_name}
                      </p>
                    </div>
                    <div className="flex justify-between mt-3 items-center">
                      <h4 className=" text-[#353537] font-semibold sm:text-lg">
                        Date:
                      </h4>
                      <p className="font-semibold text-[#b3b7c5] text-[15px]">
                        {reservation.date}
                      </p>
                    </div>
                    <div className="flex justify-between mt-3 items-center">
                      <h4 className=" text-[#353537] font-semibold sm:text-lg">
                        Location:
                      </h4>
                      <p className="font-semibold text-[#b3b7c5] text-[15px] w-1/4">
                        {reservation.city}
                      </p>
                    </div>
                    <div className="flex justify-between mt-3 items-center">
                      <h4 className=" text-[#353537] font-semibold sm:text-lg">
                        Duration:
                      </h4>
                      <p className="font-semibold text-[#b3b7c5] text-[15px]">
                        {reservation.duration}
                        {' '}
                        days
                      </p>
                    </div>
                    <div className="flex justify-between mt-3 items-center">
                      <h4 className=" text-[#353537] font-semibold sm:text-lg">
                        Price:
                      </h4>
                      <p className="font-semibold text-[#b3b7c5] text-[15px]">
                        $
                        {' '}
                        {cars.find((car) => car.id === reservation.car_id).price_per_day * reservation.duration}
                      </p>
                    </div>
                    <div className="text-center mt-5">
                      <button type="button" className=" bg-red-600 text-white px-4 py-3 rounded-2xl font-medium text-xs hover:bg-red-700 duration-150" onClick={() => handleDelete(reservation)}>
                        Cancel Reservation
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Modal
        showModal={showModal}
        onCancel={handleCancel}
        car={selectedReservation}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default ReservedCars;
