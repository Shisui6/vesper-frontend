import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { AiOutlineRight } from 'react-icons/ai';

import {
    BsArrowRightCircleFill,
    BsFillArrowLeftCircleFill,
  } from 'react-icons/bs';
  import { SlSettings } from 'react-icons/sl';

const DetailsCarScreen = () => {
  // const [booking, setBooking] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const carDetails = useSelector((state) => state.cars);
  const { loading, cars } = carDetails;
  const carss = cars?.find((c) => c.id === parseInt(id, 10));

  return (
    
  );
};

export default DetailsCarScreen;
