import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

const Cars = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3800);
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="fade-in">
      <h1>Cars</h1>
    </div>
  );
};

export default Cars;
