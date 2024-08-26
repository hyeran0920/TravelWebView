import React from 'react';
import { useNavigate } from 'react-router-dom';
import homeImage from '../img/Home.jpg';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Main');
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-screen bg-cover"
        style={{
            backgroundImage: `url(${homeImage})`,
            backgroundPosition: 'left 40% center',
        }}
    >
        <div className="flex flex-col items-center justify-center h-full space-y-4 relative z-10">
            <h1 className='Hello text-white text-8xl mb-32'>
                HELLO
            </h1>
        </div>
        <div className='w-full flex flex-col items-start p-4 mb-12 relative z-10'>
            <h1 className='text-white text-3xl font-bold' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
            여행작(旅行作)
            </h1>
            <h1 className='text-white text-7xl font-bold'>Cultural</h1>
            <h1 className='text-white text-7xl mb-4 font-bold'>Travel</h1>
            <button
                className="w-full h-14 bg-[#151bbd] hover:bg-[#000080] text-white font-bold py-2 px-4 rounded-lg"
                onClick={handleClick}
            >
                방문하기
            </button>
        </div>
    </div>
  );
};

export default Home;
