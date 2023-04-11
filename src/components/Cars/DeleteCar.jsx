import { useDispatch, useSelector } from 'react-redux';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import axios from 'axios';
import { fetchCars, selectCars } from '../../redux/cars/cars';

function DeleteCar() {
  const authHeader = useAuthHeader();
  const dispatch = useDispatch();
  const auth = useAuthUser();
  const cars = useSelector(selectCars);
  const filteredCars = cars.filter((car) => car.user_id === auth().id);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/v1/cars/${id}`, {
      headers: {
        Authorization: authHeader(),
      },
    });
    dispatch(fetchCars(authHeader()));
  };

  const garage = filteredCars.map((car) => (
    <li key={car.id} className="flex justify-between py-2 px-4">
      <span>{car.name}</span>
      <button
        type="button"
        className="bg-red-600 text-white rounded-md py-1 px-2"
        onClick={() => handleDelete(car.id)}
      >
        Delete
      </button>
    </li>
  ));

  return (
    <>
      <div className="main-container">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-center text-2xl font-extrabold text-gray-800 tracking-widest mb-3">
            Delete Car
          </h1>
          <p className="text-sm text-zinc-500">
            Please select a Room from this list to delete it
          </p>
        </div>
        <ul className="room-details-ul shadow-lg mx-4 mt-4">{garage}</ul>
      </div>
    </>
  );
}

export default DeleteCar;
