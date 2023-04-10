import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';

function AddCar() {
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
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const authHeader = useAuthHeader();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = async () => {
    setError('');

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
      if (err && err instanceof AxiosError) {
        setError(err.response.data.error);
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="flex-col pt-20 justify-center pr-6 h-screen">
      <h1 className="text-center text-gray-800 text-3xl font-semibold sm:text-4xl">Add a Car</h1>
      {error}
      <form
        onSubmit={handleSubmit}
        className="justify-center"
      >
        <input
          type="text"
          name="name"
          placeholder="name"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          required
          onChange={changeHandler}
          value={info.name}
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          required
          onChange={changeHandler}
          value={info.description}
        />
        <input
          type="text"
          name="image"
          placeholder="image"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          required
          onChange={changeHandler}
          value={info.image}
        />
        <input
          type="text"
          name="classification"
          placeholder="type"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          required
          onChange={changeHandler}
          value={info.classification}
        />
        <input
          type="text"
          name="model"
          placeholder="model"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          required
          onChange={changeHandler}
          value={info.model}
        />
        <input
          type="text"
          name="year"
          placeholder="year"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          required
          onChange={changeHandler}
          value={info.year}
        />
        <input
          type="text"
          name="price_per_day"
          placeholder="price_per_day"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          required
          onChange={changeHandler}
          value={info.price_per_day}
        />
        <button type="submit" style={{ backgroundColor: '#97bf0f' }} className=" hover:bg-[#97bf0f] text-white font-bold py-2 px-4 rounded my-4 w-full">Add car</button>
      </form>
    </div>
  );
}

export default AddCar;
