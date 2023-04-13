import React, { useEffect, useState } from 'react';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { Link } from 'react-router-dom';
import { UilBookOpen, UilHeart } from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { fetchCars, selectCars } from '../../redux/cars/cars';

const Cars = () => {
  const [loading, setLoading] = useState(true);
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const authentication = authHeader();
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);

  useEffect(() => {
    dispatch(fetchCars(authentication));
    setTimeout(() => {
      setLoading(false);
    }, 3800);
  }, [authentication, dispatch]);

  if (loading) {
    return <Loader speed={1.5} />;
  }

  if (cars.length === 0) {
    return (
      <section className="py-14 fade-in">
        <div className="max-w-screen-xl mx-auto px-4 text-center md:px-8">
          <div className="max-w-xl mx-auto">
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Welcome
              {' '}
              {auth().username}
            </h3>
            <p className="text-gray-600 mt-2 text-xs">
              Browse our collection of cars below.
            </p>
          </div>
          <div className="mt-24 flex justify-center items-center flex-col">
            <img src="/empty.png" alt="empty" className="w-24 h-24 mb-5" />
            <h2>Our garage is currently empty. Please check back later</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 fade-in">
      <div className="max-w-screen-xl mx-auto px-4 text-center md:px-8">
        <div className="max-w-xl mx-auto">
          <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Welcome
            {' '}
            {auth().username}
          </h3>
          <p className="text-gray-600 mt-2 text-xs">
            Browse our collection of cars below.
          </p>
        </div>
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {cars.map((car) => (
              <li key={car.id}>
                <div className="w-40 h-40 mx-auto">
                  <img
                    src={`/${car.image}`}
                    className="w-full h-full rounded-full"
                    alt=""
                  />
                </div>
                <div className="mt-2">
                  <h4 className="text-gray-700 font-semibold sm:text-lg">
                    {car.name}
                  </h4>
                  <p className="text-gray-600 mt-2 text-xs">
                    {car.description}
                  </p>
                  <div className="mt-4 flex justify-center gap-4 text-gray-400">
                    <Link
                      to={`/cars/${car.id}`}
                      className="w-5 h-5 duration-150 hover:text-gray-500"
                    >
                      <UilBookOpen />
                    </Link>
                    <UilHeart />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cars;
