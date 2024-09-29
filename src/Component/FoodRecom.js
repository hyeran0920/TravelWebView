import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NearbyFoodPlace from './NearbyFoodPlace'; 

const FoodRecom = () => {
  const [places, setPlaces] = useState([]); 
  const [sortedPlaces, setSortedPlaces] = useState([]); // 정렬된 음식점 데이터 상태
  const [isLocationAllowed, setIsLocationAllowed] = useState(false); // 위치 허용 여부 상태

  useEffect(() => {
    // 백엔드에서 음식 데이터를 가져옴
    axios.get('http://localhost:8080/food/all')
      .then((response) => {
        setPlaces(response.data);
        setSortedPlaces(response.data); // 기본 데이터를 설정 (정렬 전)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // NearbyFoodPlace 컴포넌트에서 정렬된 데이터를 받아 처리
  const handleSortedPlaces = (sorted) => {
    setSortedPlaces(sorted); // 정렬된 리스트를 업데이트
  };

  // NearbyFoodPlace 컴포넌트에서 위치 허용 여부를 받아 처리
  const handleLocationAllowed = (isAllowed) => {
    setIsLocationAllowed(isAllowed);
  };

  // 최종 렌더링할 장소 리스트 (정렬된 리스트를 우선 사용)
  const renderPlaces = sortedPlaces.length > 0 ? sortedPlaces : places;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>추천 맛집</h2>

      {/* NearbyFoodPlace 컴포넌트로 글자순/거리순 정렬 처리 */}
      <NearbyFoodPlace 
        places={places} 
        onSorted={handleSortedPlaces} 
        onLocationAllowed={handleLocationAllowed} 
      />
     
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {renderPlaces.length > 0 ? (
          renderPlaces.map((place, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#999', 
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
                <div style={{ position: 'absolute', top: '10px', right: '20px', fontSize: '14px' }}>{isLocationAllowed && place.distance ? `${place.distance} km` : ''}</div>
                <div style={{ textAlign: 'left' }}>
                  {/* 식당명 옆에 거리를 표시 */}
                  {place.rstrNm} 
                </div> {/* 식당명 출력 */}
                <div style={{ fontSize: '14px', fontWeight: 'normal', marginTop: '5px' }}>
                  {place.rstrRoadAddr} {/* 도로명 주소 출력 */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>데이터를 불러오는 중...</div>
        )}
      </div>
    </div>
  );
};

export default FoodRecom;
