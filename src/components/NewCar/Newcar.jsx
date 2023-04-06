import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Newcar() {
  const formRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const carInfo = {
      room: {
        name: data.name,
        image: data.image,
        beds: data.beds,
        price: data.price,
        city: data.city,
        description: data.description,
      },
    };

    // dispatch(createCar(carInfo));
    navigate('/rooms');
  };

  return (
    <div>
      <h1 className="header">Create a Room</h1>
      <form
        ref={formRef}
        onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          className="input"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          className="input"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="image"
          className="input"
          required
        />
        <input
          type="text"
          name="type"
          placeholder="type"
          className="input"
          required
        />
        <input
          type="text"
          name="model"
          placeholder="model"
          className="input"
          required
        />
        <input
          type="text"
          name="year"
          placeholder="year"
          className="input"
          required
        />
        <input
          type="text"
          name="price_per_day"
          placeholder="price_per_day"
          className="input"
          required
        />
      </form>
    </div>
  );
}

export default Newcar;
