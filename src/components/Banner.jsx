import React from 'react';
import { Link } from 'react-router-dom';

const Banner = ({ title, subtitle, linkText, onClick, backgroundImage }) => {
  return (
    <header
      className='flex flex-col gap-3 justify-center items-center w-full'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', // Ensures the image covers the entire header
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat',
        height: '70vh', // Sets the height of the header to 70% of the viewport height
      }}
    >
      <h1 className='text-6xl font-bold text-white uppercase'>{title}</h1>
      <p className='text-3xl text-white'>{subtitle}</p>
      <button className='px-4 py-4 text-white bg-cyan-300' onClick={onClick}>
        {linkText}
      </button>
    </header>
  );
};

export default Banner;
