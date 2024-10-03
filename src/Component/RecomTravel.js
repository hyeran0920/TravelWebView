import React from 'react';
import { useNavigate } from 'react-router-dom';

import Seoul from '../img/seoul.jpg';
import Gyeonggido from '../img/Gyeonggido.jpg';
import Songdo from '../img/songdo.jpg';
import Gangwon from '../img/gangwon.jpg';
import Chungcheong from '../img/Chungcheong.jpg';
import Chungbuk from '../img/chungbuk.jpg';
import Gyeongsangdo from '../img/Gyeongsangdo.jpg';
import Gyeongbuk from '../img/Gyeongbuk.jpg';
import Jeonbuk from '../img/Jeonbuk.jpg';
import Jeonnam from '../img/Jeonnam.jpg';
import Busan from '../img/busan.jpg'
import Deagu from '../img/Deagu.jpg'
import Jeju from '../img/Jejuisland.jpg'
import Daejeon from '../img/Daejeon.jpg'
import Gwangju from '../img/Gwangju.jpg'
import Ulsan from '../img/Ulsan.jpg'

const locations = [
  { name: '서울', picture: Seoul },
  { name: '경기도', picture: Gyeonggido },
  { name: '인천', picture: Songdo },
  { name: '강원도', picture: Gangwon },
  { name: '충청남도', picture: Chungcheong },
  { name: '충청북도', picture: Chungbuk },
  { name: '대전', picture: Daejeon },
  { name: '경상남도', picture: Gyeongsangdo },
  { name: '부산', picture: Busan },
  { name: '경상북도', picture: Gyeongbuk },
  { name: '대구', picture: Deagu },
  { name: '울산', picture: Ulsan },
  { name: '전라남도', picture: Jeonnam },
  { name: '광주', picture: Gwangju },
  { name: '전라북도', picture: Jeonbuk },
  { name: '제주특별자치도', picture: Jeju },
];

const RecomTravel = () => {

  const navigate = useNavigate();

  const handleLocationClick = (locationName) => {
    // navigate로 지역명을 URL 파라미터로 전달
    navigate(`/locations/${locationName}`);
  }

  const handleFestivalButtonClick = () => {
    navigate('/festivals');
  };

  return (
    <div style={{ padding: '0 20px 20px 20px' }}>
      {/* Title and Festival Button in the same line */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', marginTop: '25px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>지역별 촬영지</h2>
        <button
          onClick={handleFestivalButtonClick}
          style={{
            backgroundColor: '#79353E',
            color: 'white',
            borderRadius: '50px',
            padding: '7px 15px',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
          }}
        >
          축제 보기 &#62;
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {locations.map((place, index) => (
          <div
            key={index}
            onClick={() => handleLocationClick(place.name)}
            style={{
              borderRadius: '10px',
              overflow: 'hidden',
              height: '180px',
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '20px',
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            <img
              src={place.picture}
              alt={place.name}
              loading="lazy"
              className="absolute inset-0 object-cover object-top w-full h-full rounded-lg"
            />
            <div className="relative z-10 top-2">
              <div
                style={{
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}
              >
                {place.name}
              </div>
            </div>
          </div>
        ))}
        <br />
      </div>
    </div>
  );
};

export default RecomTravel;