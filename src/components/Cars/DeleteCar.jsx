import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import axios from 'axios';
import { UilTrashAlt } from '@iconscout/react-unicons';
import { fetchCars, selectCars } from '../../redux/cars/cars';
import Loader from '../Loader/Loader';

const DeleteCar = () => {
  const authHeader = useAuthHeader();
  const authentication = authHeader();
  const dispatch = useDispatch();
  const auth = useAuthUser();
  const cars = useSelector(selectCars);
  const filteredCars = cars.filter((car) => car.user_id === auth().id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchCars(authentication));
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, [authentication, dispatch]);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/v1/cars/${id}`, {
      headers: {
        Authorization: authHeader(),
      },
    });
    dispatch(fetchCars(authHeader()));
  };

  if (loading) {
    return <Loader speed={2} />;
  }

  if (filteredCars.length === 0) {
    return (
      <section className="py-14 fade-in">
        <div className="max-w-screen-xl mx-auto px-4 text-center md:px-8">
          <div className="max-w-xl mx-auto">
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Remove Car
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
              Remove Car
            </h3>
            <p className="text-gray-600 mt-2 text-xs">
              Please select a car from the list to remove it.
            </p>
          </div>
          <div className="mt-12">
            <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {filteredCars.map((car) => (
                <li key={car.id}>
                  <div className="w-40 h-40 mx-auto">
                    <img
                      src={`/${car.image}`}
                      className="w-full h-full rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="flex justify-between w-[50%] items-center mt-5 mx-auto">
                    <h4 className="text-gray-700 font-semibold sm:text-lg">
                      {car.name}
                    </h4>
                    <button type="button" className=" text-red-600 w-5 h-5 duration-150 hover:text-red-800" onClick={() => handleDelete(car.id)}>
                      <UilTrashAlt />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

    </>
  );
};

export default DeleteCar;
