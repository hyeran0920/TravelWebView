import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import
import Map from '../Component/Map';


const Footer = () => {
  const [active, setActive] = useState('home');
  const navigate = useNavigate(); // 경로 이동을 위한 useNavigate 훅 사용

  const handleNavClick = (navItem) => {
    setActive(navItem);
    if (navItem === 'home') {
      navigate('/main'); // 'home' 버튼을 클릭하면 '/main' 경로로 이동
    } else if (navItem === 'Map') {
      navigate('/Map'); // '지도' 버튼을 클릭하면 '/map' 경로로 이동
    } else if (navItem === 'back') {
      navigate(-1); // '뒤로가기' 버튼을 클릭하면 이전 페이지로 이동
    }
  };

  return (
    <div>
      <div className="fixed bottom-0 left-0 right-0 flex justify-around p-4 bg-white shadow-md">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => handleNavClick('back')}
          className={`flex flex-col items-center ${
            active === 'back' ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <i className="text-xl fas fa-arrow-left"></i>
          <span className="text-xs">Back</span>
        </button>

        {/* 홈 버튼 */}
        <button
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center ${
            active === 'home' ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <i className="text-xl fas fa-home"></i>
          <span className="text-xs">Home</span>
        </button>

        {/* 지도 버튼 */}
        <button
          onClick={() => handleNavClick('Map')}
          className={`flex flex-col items-center ${
            active === 'map' ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <i className="text-xl fas fa-map-marker-alt"></i>
          <span className="text-xs">Map</span>
        </button>
      </div>
    </div>
  );
};

export default Footer;
