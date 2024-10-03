import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from '../img/DefaultImg.jpg';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트

const FamousTravel = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true); // 자동 전환 활성화
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState({});
  const navigate = useNavigate(); // useNavigate 사용

  // 백엔드에서 랜덤으로 선택된 7개의 콘텐츠 데이터를 가져오기
  useEffect(() => {
    axios.get('http://localhost:8080/content/random')  // 백엔드의 새로운 엔드포인트로 요청
      .then(response => {
        const randomDestinations = response.data;
        setDestinations(randomDestinations); // 7개의 촬영지 리스트 설정
        setLoading(false); // 로딩 완료
        fetchImagesForLocations(randomDestinations); // 선택한 7개 촬영지에 대해 이미지 가져오기
      })
      .catch(error => {
        setError("촬영지 데이터를 가져오는 중 오류가 발생했습니다.");
        setLoading(false);  // 에러 발생 시 로딩 종료
      });
  }, []);

  // 자동 슬라이드 전환
  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % destinations.length);
      }, 3000); // 3초마다 슬라이드 전환

      return () => clearInterval(interval); // 클린업 함수
    }
  }, [autoPlay, destinations.length]);

  // 장소 박스를 클릭하면 해당 작품의 장소를 선택하고 페이지로 이동하는 함수
  const handlePlaceClick = (contentTitle, placeName) => {
    navigate(`/InformationByPlace/${contentTitle}/${placeName}`); // contentTitle과 placeName으로 URL 이동
  };

  // 슬라이드의 이미지 URL만 반환
  const getSlideImageUrl = () => {
    const currentDestination = destinations[selectedIndex];

    if (!currentDestination) return Home; // 기본 이미지

    // 이미지 URL 가져오기
    return images[currentDestination.place_Name]
      ? images[currentDestination.place_Name]
      : Home;  // 이미지가 없으면 기본 이미지 사용
  };

  // 장소 이름을 이용해 이미지를 가져오는 함수
  const fetchImage = async (placeName) => {
    try {
      const response = await axios.get('http://localhost:8080/api/search/place-photo', {
        params: { query: placeName },
      });

      const place = response.data.candidates[0];
      if (place && place.photos && place.photos.length > 0) {
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=AIzaSyCTVgQ9PgD16SIcmOd16eT2TuYl5OwhCY0`;
        return photoUrl;
      }
    } catch (error) {
      console.error(`Error fetching image for ${placeName}:`, error);
    }

    return null;
  };

  // 모든 장소에 대해 이미지를 가져오는 함수
  const fetchImagesForLocations = async (allDestinations) => {
    const newImages = {};

    for (const destinations of allDestinations) {
      const imageUrl = await fetchImage(destinations.place_Name);
      if (imageUrl) {
        newImages[destinations.place_Name] = imageUrl;
      }
    }

    setImages(newImages); // 이미지 상태 업데이트
  };

  // 로딩 중일 때 표시
  if (loading) {
    return <p>Loading filming locations...</p>;
  }

  // 에러 발생 시 표시
  if (error) {
    return <p>{error}</p>;
  }

  // 데이터가 없을 경우 처리
  if (destinations.length === 0) {
    return <p>미리보기가 제공되지 않습니다.</p>;
  }

  const currentDestination = destinations[selectedIndex]; // 현재 선택된 촬영지 정보 가져오기

  // 슬라이드의 이미지 URL을 가져와서 배경 이미지로 사용
  return (
    <div 
      style={{ 
        width: '100%', 
        height: '43vh',  // 화면의 40% 높이로 설정
        position: 'relative',  // 텍스트를 이미지 위에 겹치기 위해 설정
        backgroundImage: `url(${getSlideImageUrl()})`, // 이미지 URL을 배경 이미지로 사용
        backgroundSize: 'cover',  // 이미지를 부모 div에 맞추어 채움
        backgroundPosition: 'center', // 이미지의 중앙을 기준으로 맞춤
        backgroundRepeat: 'no-repeat',  // 이미지가 반복되지 않도록 설정
      }}
    >
            <style>
        {`
@font-face {
    font-family: 'paybooc-Bold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/paybooc-Bold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
        `}
      </style>

      {/* placeName을 이미지 하단에 표시 */}
      <div 
  style={{ 
    position: 'absolute', 
    bottom: '10px',  // 이미지 하단에서 10px 위에 위치
    color: 'white', 
    fontSize: '24px', 
    padding: '5px 10px',  // 텍스트 주변의 패딩
    textAlign: 'center',  // 텍스트를 가운데 정렬
    fontWeight: 800,  // 세미볼드 설정
    width: '100%', // 텍스트가 div 안에서 가운데에 위치하도록 설정
    fontFamily: 'paybooc-Bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' // 글자에 그림자 적용
  }}
>

        {currentDestination && currentDestination.place_Name} {/* placeName 텍스트 표시 */}
      </div>
    </div>
  );
};

export default FamousTravel;
