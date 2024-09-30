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
  };

  const categories = ['지역', '영화', '드라마', '맛집'];

  return (
    <div className="flex items-center justify-center pt-2 space-x-4 bg-white shadow-md">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleClick(category)}
          className={`text-xs font-medium ${
            active === category 
              ? 'text-[#1034A6] bg-[#F3F8FE] rounded-2xl px-4 py-3' 
              : 'text-gray-400 px-2 py-2'
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
