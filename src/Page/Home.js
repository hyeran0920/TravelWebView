import React from 'react';
import { useNavigate } from 'react-router-dom';
import homeImage from '../img/Home.png';
import logo from '../img/LOGO1.png';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Main');
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-cover"
        style={{
            backgroundImage: `url(${homeImage})`,
            backgroundPosition: 'center',
            backgroundSize: '130%',  // 이미지를 1.5배 확대
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#1A232E',  // 배경색을 흰색으로 설정
        }}
    >
      <style>
        {`
          @font-face {
            font-family: 'SF_HambakSnow';
            src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/SF_HambakSnow.woff') format('woff');
            font-weight: normal;
            font-style: normal;
          }
        `}
      </style>

      <div className='absolute z-10 flex flex-col items-start w-full p-4 mb-12' style={{ bottom: '80px' }}>
        <button
            className="w-full h-14 bg-[#79353e] hover:bg-[#633036] text-white font-bold py-2 px-4 rounded-2xl"
            onClick={handleClick}
            style={{ fontFamily: 'SF_HambakSnow' }}  // 폰트 적용
        >
          Fik! 하러 가기
        </button>
      </div>
    </div>
  );
};

export default Home;
