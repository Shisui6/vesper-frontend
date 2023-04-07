import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuthHeader } from 'react-auth-kit';
import { useParams, useDispatch } from 'react-router-dom';
// import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import Loader from '../Loader/Loader';
import { fetchCars } from '../../redux/cars/cars';

const DetailsCarScreen = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const authHeader = useAuthHeader();
  const { id } = useParams();
  const carDetails = useSelector((state) => state.cars);
  const cars = carDetails;
  const carss = cars?.find((c) => c.id === parseInt(id, 10));

  useEffect(() => {
    dispatch(fetchCars(authHeader()));
    setTimeout(() => {
      setLoading(false);
    }, 3800);
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (!cars) {
    return (
      <>
        <h2>Sorry</h2>
        <p>
          There is no car in Garage
        </p>

      </>
    );
  }

  return (
    <>
      {carss && (
        <div className="flex flex-col items-center md:justify-start justify-center w-full md:flex-row grow h-full lg:pt-20 lg:pb-10">
          <div className="grow  md:w-5/6 flex items-center justify-center md:px-10 rounded-full aspect-square">
            <img
              src={carss.image?.url}
              alt={carss?.name}
              className="object-cover block rounded-full m-4 aspect-square w-[100%] md:ml-[40%]"
            />
          </div>
          <div className="flex flex-col w-full items-start md:items-end  md:mr-10 py-10 px-10 lg:px-0 text-center">
            <div className="flex flex-col  items-center md:items-end">
              <h1 className="md:text-right mb-4 text-3xl font-semibold text-slate-800">
                {carss?.name}
              </h1>
              <p className=" mb-10  md:text-right text-gray-500 text-sm">
                {carss?.description}
              </p>
            </div>
            <div className="flex flex-col grow md:items-end ">
              <div className="grow flex flex-col rounded-2xl overflow-hidden border">
                <div className="flex justify-center items-center gap-4 border-b">
                  <h3 className="font-bold my-4">Other Details</h3>
                </div>
                <ul className="grow-0 p-4">
                  <li className="odd:bg-gray-200 bg-gray-100 py-2 px-4">
                    <div className="flex items-center justify-center">
                      <span className="pr-10">Type</span>
                      <span className="text-right">{carss?.type}</span>
                    </div>
                  </li>
                  <li className="odd:bg-gray-200 bg-gray-100 py-2 px-4">
                    <div className="flex items-center justify-center">
                      <span className="pr-10">Model</span>
                      <span className="text-right">
                        $
                        {carss?.model}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <p className="flex items-center gap-2 mt-1">
                DISCOVER MORE MODELS
                {' '}
                <AiOutlineRight className="text-yellow-500" />
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsCarScreen;
