import React from 'react';
import { useNavigate } from 'react-router-dom';
import homeImage from '../img/Home.jpg';
import logo from '../img/mainLogo.png';


const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Main');
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-cover"
        style={{
            backgroundImage: `url(${homeImage})`,
            backgroundPosition: 'left 40% center',
        }}
    >
        <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4">
            <img
                className="w-full h-full"
                src={logo}
                alt='Film in Korea Logo'
            />
        </div>
        <div className='relative z-10 flex flex-col items-start w-full p-4 mb-12'>
            <h1 className='text-5xl font-bold text-white' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
            Fik
            </h1>
            <h1 className='font-bold text-white text-7xl'>Cultural</h1>
            <h1 className='mb-4 font-bold text-white text-7xl'>Travel</h1>
            <button
                className="w-full h-14 bg-[#151bbd] hover:bg-[#000080] text-white font-bold py-2 px-4 rounded-lg"
                onClick={handleClick}
            >
                Fik 하러가기
            </button>
        </div>
    </div>
  );
};

export default Home;
