import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const [active, setActive] = useState('지역');
  const navigate = useNavigate();

  const handleClick = (category) => {
    setActive(category);
    if (category === '맛집') {
      navigate('/Food');
    }
    if (category === '지역') {
      navigate('/Main');
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

  const categories = ['지역', '영화', 'Home','드라마', '맛집'];

  return (
    <div className="flex items-center justify-center pt-2 pb-1 space-x-4 bg-gradient-to-b from-[#79353e] to-[#a36d6e]">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleClick(category)}
          className={`text-xs font-medium ${
            active === category 
              ? 'text-[#fff] bg-[#aa6d6e] rounded-2xl px-4 py-2' 
              : 'text-gray-300 px-2 py-2'
          }`}
          style={{ fontWeight: active === category ? 'bold' : 'normal' }}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Nav;
