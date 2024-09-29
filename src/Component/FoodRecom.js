import React, { useEffect, useState } from 'react';
import axios from 'axios';
import defaultImage from '../img/FoodImg.jpg'


const FoodRecom = () => {
  const [places, setPlaces] = useState([]);  // 장소 데이터를 저장할 상태
  const [images, setImages] = useState({});  // 이미지를 저장할 상태



  // 백엔드에서 음식 데이터를 가져오는 함수
  useEffect(() => {
    axios.get('http://localhost:8080/food/all')
      .then((response) => {
        setPlaces(response.data);  // 음식 데이터를 저장
        fetchImagesForPlaces(response.data);  // 이미지 가져오기 함수 호출
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

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

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>추천 맛집</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {places.length > 0 ? (
          places.map((place, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                borderRadius: '10px',
                overflow: 'hidden',
                height: '200px',
                color: '#fff',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              {/* 이미지 태그로 출력, onError로 기본 이미지 설정 */}
              {images[place.rstrNm] ? (
                <img
                  src={images[place.rstrNm]}
                  alt={place.rstrNm}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: -1,
                  }}
                  onError={(e) => { e.target.src = defaultImage; }}  // 이미지 로드 실패 시 기본 이미지로 대체
                />
              ) : (
                <img
                  src={defaultImage}  // 기본 이미지
                  alt="No Image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: -1,
                  }}
                />
              )}

              {/* 텍스트 오버레이 */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: '#fff',
                }}
              >
                <div>{place.rstrNm}</div>  {/* 식당명 출력 */}
                <div style={{ fontSize: '14px', marginTop: '5px' }}>{place.rstrRoadAddr}</div>  {/* 도로명 주소 출력 */}
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
