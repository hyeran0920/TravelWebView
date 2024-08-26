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
    if (category === '컨텐츠') {
      navigate('/Contents');
    }
  };

  const categories = ['지역', '컨텐츠', '맛집', '레저', '뭐해'];

  return (
    <div className="flex justify-center items-center space-x-4 p-2 bg-white shadow-md">
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