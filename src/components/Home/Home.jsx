import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { UilSignInAlt, UilRegistered } from '@iconscout/react-unicons';
import './Home.css';
import car1 from '../../images/car-1.jpg';
import car2 from '../../images/car-2.jpg';
import car3 from '../../images/car-3.jpg';
import car4 from '../../images/car-4.jpg';
import car5 from '../../images/car-5.jpg';

const imageData = [
  {
    label: 'Image 1',
    alt: 'image1',
    url: car1,
  },
  {
    label: 'Image 2',
    alt: 'image2',
    url: car2,
  },
  {
    label: 'Image 3',
    alt: 'image3',
    url: car3,
  },
  {
    label: 'Image 4',
    alt: 'image4',
    url: car4,
  },
  {
    label: 'Image 5',
    alt: 'image5',
    url: car5,
  },
];

const renderSlides = imageData.map((image) => (
  <div key={image.alt} className="slide-img">
    <div className="slide-text">
      <h1>Experience Vesper</h1>
      <p>The ultimate car sharing experience</p>
      <div className="flex">
        <Link to="login">
          <button type="button">
            Login
            <UilSignInAlt color="#fff" />
          </button>
        </Link>
        <Link to="register">
          <button type="button">
            Sign up
            <UilRegistered color="#fff" />
          </button>
        </Link>
      </div>
    </div>
    <img src={image.url} alt={image.alt} />
  </div>
));

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState();

  const handleChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="Home">
      <Carousel
        showArrows
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        interval={5000}
        selectedItem={imageData[currentIndex]}
        onChange={handleChange}
        className="carousel-container"
      >
        {renderSlides}
      </Carousel>
    </div>
  );
};

export default Home;
