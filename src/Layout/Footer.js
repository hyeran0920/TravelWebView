import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { FaMapMarkedAlt, FaFilm } from 'react-icons/fa';
import { MdLiveTv } from 'react-icons/md';

const Nav = () => {
  const [active, setActive] = useState('Home');
  const navigate = useNavigate();

  const handleClick = (category) => {
    setActive(category);
    if (category === '맛집') {
      navigate('/Food');
    }
    if (category === '지도') {
      navigate('/Map');
    }
    if (category === '영화') {
      navigate('/Movie');
    }
    if (category === '드라마') {
      navigate('/Drama');
    }
    if (category === 'Home') {
      navigate('/Main');
    }
  };

  const categories = [
    { name: 'Home', icon: <AiFillHome /> },
    { name: '영화', icon: <FaFilm /> },
    { name: '드라마', icon: <MdLiveTv /> },
    { name: '맛집', icon: <GiForkKnifeSpoon /> },
    { name: '지도', icon: <FaMapMarkedAlt /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around p-2 shadow-md bg-[#fff]">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => handleClick(category.name)}
          className={`flex flex-col items-center text-lg font-medium ${active === category.name
              ? 'text-[#79353e] bg-[#eee] rounded-2xl px-4 py-2'
              : 'text-gray-700 px-4 py-2 bg-[#fff] rounded-2xl'
            }`}
          style={{ fontWeight: active === category.name ? 'bold' : 'normal' }}
        >
          {category.icon}
        </button>
      ))}
    </div>
  );
};

export default Nav;
