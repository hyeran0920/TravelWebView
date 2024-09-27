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

const locations = [
  { name: '서울', picture: Seoul },
  { name: '경기도', picture: Gyeonggido },
  { name: '인천', picture: Songdo },
  { name: '강원도', picture: Gangwon },
  { name: '충청남도', picture: Chungcheong },
  { name: '충청북도', picture: Chungbuk },
  { name: '경상남도', picture: Gyeongsangdo },
  { name: '경상북도', picture: Gyeongbuk },
  { name: '부산', picture: Busan },
  { name: '대구', picture: Deagu },
  { name: '전라남도', picture: Jeonnam },
  { name: '전라북도', picture: Jeonbuk },
];

const RecomTravel = () => {

  const navigate = useNavigate();

  const handleLocationClick = (locationName) => {
    // navigate로 지역명을 URL 파라미터로 전달
    navigate(`/locations/${locationName}`);
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>지역별 촬영지</h2>
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