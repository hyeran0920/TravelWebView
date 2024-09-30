import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NearbyFoodPlace from './NearbyFoodPlace'; 

const FoodRecom = () => {
  const [places, setPlaces] = useState([]); 
  const [sortedPlaces, setSortedPlaces] = useState([]); // 정렬된 음식점 데이터 상태
  const [isLocationAllowed, setIsLocationAllowed] = useState(false); // 위치 허용 여부 상태
  const [images, setImages] = useState({}); // 이미지를 저장할 상태

  useEffect(() => {
    // 백엔드에서 음식 데이터를 가져옴
    axios.get('http://localhost:8080/food/all')
      .then((response) => {
        setPlaces(response.data);
        setSortedPlaces(response.data); // 기본 데이터를 설정 (정렬 전)
        fetchImagesForPlaces(response.data); // 음식점 이미지 가져오기
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

  // 장소 이름을 이용해 이미지를 가져오는 함수
  const fetchImage = async (placeName) => {
    try {
      const response = await axios.get('http://localhost:8080/api/search/place-photo', {
        params: { query: placeName },  // 장소 이름을 query 파라미터로 전달
      });

      const place = response.data.candidates[0];
      if (place && place.photos && place.photos.length > 0) {
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=AIzaSyCSlrTpLiBQ3US7E_XtN6QweAOURzeg8Cc`;
      }
    } catch (error) {
      console.error(`Error fetching image for ${placeName}:`, error);
    }
    return null;
  };

  // 모든 장소에 대해 이미지를 가져오는 함수
  const fetchImagesForPlaces = async (places) => {
    const newImages = {};

    for (const place of places) {
      const imageUrl = await fetchImage(place.rstrNm);  // 식당명으로 이미지 가져오기
      if (imageUrl) {
        newImages[place.rstrNm] = imageUrl;
      }
    }

    setImages(newImages);  // 이미지 상태 업데이트
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
                backgroundImage: images[place.rstrNm] ? `url(${images[place.rstrNm]})` : null,  // 배경에 이미지 추가
                backgroundSize: 'cover', // 이미지 크기 설정
                backgroundPosition: 'center', // 이미지 위치 설정
              }}
            >
              <div style={{ position: 'absolute', top: '10px', right: '20px', fontSize: '14px' }}>
                {isLocationAllowed && place.distance ? `${place.distance} km` : ''}
              </div>
              <div style={{ textAlign: 'left' }}>
                {/* 식당명 옆에 거리를 표시 */}
                {place.rstrNm} 
              </div> {/* 식당명 출력 */}
              <div style={{ fontSize: '14px', fontWeight: 'normal', marginTop: '5px' }}>
                {place.rstrRoadAddr} {/* 도로명 주소 출력 */}
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
