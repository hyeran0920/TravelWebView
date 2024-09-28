import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FoodRecom = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // 백엔드에서 음식 데이터를 가져옴
    axios.get('http://localhost:8080/food/all')
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>추천 여행지</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {places.length > 0 ? (
          places.map((place, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#999', // 배경색 임시 설정 (필요하면 백엔드에서 받아온 데이터로 수정 가능)
                borderRadius: '10px',
                overflow: 'hidden',
                height: '150px',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '20px',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              <div>
                <div style={{ textAlign: 'left' }}>{place.rstrNm}</div> {/* 식당명 출력 */}
                <div style={{ fontSize: '14px', fontWeight: 'normal', marginTop: '5px' }}>
                  {place.rstrRoadAddr}
                </div> {/* 도로명 주소 출력 */}
              </div>
            </div>
          ))
        ) : (
          <div>데이터를 불러오는 중...</div>
        )}
        <br />
      </div>
    </div>
  );
};

export default FoodRecom;
