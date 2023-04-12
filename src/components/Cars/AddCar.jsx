import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import img from '../../images/new-car.jpg';

const AddCar = () => {
  const auth = useAuthUser();
  const [info, setInfo] = useState({
    name: '',
    description: '',
    image: '',
    classification: '',
    model: '',
    year: '',
    price_per_day: '',
    user_id: auth().id,
  });
  const navigate = useNavigate();
  const authHeader = useAuthHeader();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  /* eslint-disable */
  const handleSubmit = async (e) => {
    e.preventDefault();
    info.image = `${info.classification}.jpg`;
    info.owner = auth().username;
    try {
      const res = await axios.post('http://localhost:3000/api/v1/cars', info, {
        headers: {
          Authorization: authHeader(),
        },
      });
      if (res.status === 200) {
        navigate('/cars');
      }
    } catch (err) {
      return err;
    }
  };
  /* eslint-enable */
  return (
    <main className="flex overflow-hidden mt-10 h-[87vh] rounded-2xl">
      <div className=" flex-1 hidden lg:block">
        <img src={img} className="w-full h-screen object-cover" alt="car" />
      </div>
      <div className="pt-5 flex-1 lg:flex lg:justify-center lg:h-screen lg:overflow-auto">
        <div className="max-w-lg flex-1 mx-auto px-4 text-gray-600">
          <div>
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              New Car
            </h3>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-5 mt-6 lg:pb-12"
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={changeHandler}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <input
                type="text"
                name="description"
                required
                placeholder="Description"
                onChange={changeHandler}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <select className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg" required onChange={changeHandler} name="classification" defaultValue="">
                <option value="" disabled>Select a type</option>
                <option value="suv">SUV</option>
                <option value="electric">Electric</option>
                <option value="hatchback">Hatchback</option>
                <option value="convertible">Convertible</option>
                <option value="coupe">Coupe</option>
                <option value="sedan">Sedan</option>
                <option value="sports">Sports Car</option>
                <option value="minivan">Minivan</option>
                <option value="pickup">Pickup Truck</option>
                <option value="wagon">Station Wagon</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                name="model"
                required
                placeholder="Model"
                onChange={changeHandler}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <input
                type="number"
                name="year"
                required
                onChange={changeHandler}
                placeholder="Which year was it made. E.g 2021"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <input
                type="number"
                name="price_per_day"
                required
                onChange={changeHandler}
                placeholder="Price per day"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg duration-150"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddCar;
