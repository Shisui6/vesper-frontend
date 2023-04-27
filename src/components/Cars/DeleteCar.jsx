import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { UilTrashAlt } from '@iconscout/react-unicons';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  deleteCar, fetchCars, removeCar, selectCars, selectIsLoading,
} from '../../redux/cars/cars';
import CarSkeleton from './CarSkeleton';
import Modal from '../Modal/Modal';

const DeleteCar = () => {
  const authHeader = useAuthHeader();
  const authentication = authHeader();
  const dispatch = useDispatch();
  const auth = useAuthUser();
  const cars = useSelector(selectCars);
  const filteredCars = cars.filter((car) => car.user_id === auth().id);
  const loading = useSelector(selectIsLoading);
  const [animationParent] = useAutoAnimate();
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState({});

  useEffect(() => {
    dispatch(fetchCars(authentication));
  }, [authentication, dispatch]);

  const handleDelete = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    const data = {
      id: selectedCar.id,
      auth: authentication,
    };

    dispatch(deleteCar(data));
    setShowModal(false);
    dispatch(removeCar(selectedCar.id));
  };

  if (loading) {
    return (
      <section className="py-14 fade-in">
        <div className="max-w-screen-xl mx-auto px-4 text-center md:px-8">
          <div className="max-w-xl mx-auto">
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Manage Your Cars
            </h3>
            <p className="text-gray-600 mt-2 text-xs">
              Please select a car from the list to remove it.
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

  if (filteredCars.length === 0) {
    return (
      <section className="py-14 fade-in">
        <div className="max-w-screen-xl mx-auto px-4 text-center md:px-8">
          <div className="max-w-xl mx-auto">
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Manage Your Cars
            </h3>
            <p className="text-gray-600 mt-2 text-xs">
              Please select a car from the list to remove it.
            </p>
          </div>
          <div className="mt-24 flex justify-center items-center flex-col">
            <img src="/empty.png" alt="empty" className="w-24 h-24 mb-5" />
            <h2>No cars saved. Add a car to see it here</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-14 fade-in">
        <div className="max-w-screen-xl mx-auto px-4 text-center md:px-8">
          <div className="max-w-xl mx-auto">
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Manage Your Cars
            </h3>
            <p className="text-gray-600 mt-2 text-xs">
              Please select a car from the list to remove it.
            </p>
          </div>
          <div className="mt-12">
            <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3" ref={animationParent}>
              {filteredCars.map((car) => (
                <li key={car.id} className="rounded-xl shadow-md pb-6">
                  <div className="h-60">
                    <img
                      src={`/${car.image}`}
                      className="w-full h-full rounded-t-xl"
                      alt=""
                    />
                  </div>
                  <div className="flex justify-between mt-5 px-6">
                    <h4 className="text-[#353537] font-semibold sm:text-lg">
                      {car.name}
                    </h4>
                    <button type="button" className=" text-red-600 w-5 h-5 duration-150 hover:text-red-800" onClick={() => handleDelete(car)}>
                      <UilTrashAlt />
                    </button>
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
        car={selectedCar}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default DeleteCar;
