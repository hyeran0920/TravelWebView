import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NearbyFoodPlace from './NearbyFoodPlace'; 
import defaultImage from '../img/FoodImg.jpg'; // 기본 이미지 import

const FoodRecom = () => {
  const [places, setPlaces] = useState([]); 
  const [sortedPlaces, setSortedPlaces] = useState([]); // 정렬된 음식점 데이터 상태
  const [isLocationAllowed, setIsLocationAllowed] = useState(false); // 위치 허용 여부 상태
  const [images, setImages] = useState({}); // 이미지를 저장할 상태
  const [ratings, setRatings] = useState({}); // 별점 데이터를 저장할 상태

  // 백엔드에서 음식 데이터를 가져오는 함수
  useEffect(() => {
    axios.get('http://localhost:8080/food/all')
      .then((response) => {
        setPlaces(response.data);
        setSortedPlaces(response.data); // 기본 데이터를 설정 (정렬 전)
        fetchImagesForPlaces(response.data); // 음식점 이미지 가져오기
        fetchRatingsForPlaces(response.data); // 별점 데이터 가져오기
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
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=YOUR_GOOGLE_API_KEY`;
      }
    } catch (error) {
      console.error(`Error fetching image for ${placeName}:`, error);
    }
    return null;
  };

  // 장소 이름을 이용해 백엔드에서 별점 정보를 가져오는 함수
  const fetchRating = async (placeName) => {
    try {
      const response = await axios.get('http://localhost:8080/api/search/place-photo', {
        params: { query: placeName },  // 장소 이름을 query 파라미터로 전달
      });

      const place = response.data.candidates[0]; // 첫 번째 결과 가져오기
      if (place && place.rating) {
        return place.rating; // 별점 정보 반환
      } else {
        console.log("Rating not found for the specified place.");
      }
    } catch (error) {
      console.error(`Error fetching rating for ${placeName}:`, error);
    }
    return null;
  };

  // 모든 장소에 대해 별점 데이터를 가져오는 함수
  const fetchRatingsForPlaces = async (places) => {
    const newRatings = {};

    for (const place of places) {
      const rating = await fetchRating(place.rstrNm);  // 식당명으로 별점 가져오기
      if (rating) {
        newRatings[place.rstrNm] = rating;
      }
    }

    setRatings(newRatings);  // 별점 상태 업데이트
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
    <div style={{ padding: '0 20px 20px 20px ' }}>
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
              className="relative flex flex-col justify-between h-48 p-5 overflow-hidden rounded-lg shadow-md"
              style={{
                backgroundImage: images[place.rstrNm] ? `url(${images[place.rstrNm]})` : `url(${defaultImage})`,  // 이미지가 없으면 기본 이미지
                backgroundColor: '#007BFF', // 파란색 배경 (이미지가 없을 때)
                backgroundSize: 'cover', // 이미지 크기 설정
                backgroundPosition: 'center', // 이미지 위치 설정
              }}
            >
              <div className="absolute bottom-0 left-0 w-full p-2 text-lg font-bold text-left text-white">
                <div className="absolute text-sm text-white top-2 right-4">
                  {isLocationAllowed && place.distance ? `${place.distance} km` : ''}
                </div>
                {place.rstrNm} 
                <span className="ml-2 text-sm text-yellow-400">{ratings[place.rstrNm] ? `★ ${ratings[place.rstrNm]}` : '별점 없음'}</span> {/* 별점 추가 */}
                <p className="mt-1 text-sm text-gray-200">
                  {place.rstrRoadAddr}
                </p>
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
