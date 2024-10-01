import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from '../img/DefaultImg.jpg';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트

const FamousTravel = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSubIndex, setSelectedSubIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
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

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setSelectedSubIndex((prevSubIndex) => {
          if (prevSubIndex === 2) {
            setSelectedIndex((prevIndex) => (prevIndex + 3) % destinations.length);
            return 0;
          }
          return prevSubIndex + 1;
        });
      }, 3000); // 각 슬라이드가 3초마다 순서대로 커짐

      return () => clearInterval(interval); // 클린업 함수
    }
  }, [autoPlay, destinations]);

  const handleNext = () => {
    setSelectedSubIndex(0);
    setSelectedIndex((prevIndex) => (prevIndex + 3) % destinations.length);
    setAutoPlay(false);
  };

  const handlePrev = () => {
    setSelectedSubIndex(0);
    setSelectedIndex((prevIndex) => (prevIndex - 3 + destinations.length) % destinations.length);
    setAutoPlay(false);
  };

  // 장소 박스를 클릭하면 해당 작품의 장소를 선택하고 페이지로 이동하는 함수
  const handlePlaceClick = (contentTitle, placeName) => {
    navigate(`/InformationByPlace/${contentTitle}/${placeName}`); // contentTitle과 placeName으로 URL 이동
  };

  const renderSlides = () => {
    const startIndex = selectedIndex;
    const slidesToShow = destinations.slice(startIndex, startIndex + 3).concat(
      destinations.slice(0, Math.max(0, (startIndex + 3) - destinations.length))
    );

    return slidesToShow.map((dest, index) => {
      const isSelected = selectedSubIndex === index;

      // 여기서 backgroundImageUrl 변수를 선언합니다.
      const backgroundImageUrl = images[dest.place_Name]
        ? images[dest.place_Name]
        : Home;

      return (
        <div
          key={index}
          onClick={() => handlePlaceClick(dest.title_NM, dest.place_Name)} // 이미지 클릭 시 contentTitle과 placeName으로 이동
          style={{
            flex: isSelected ? '3' : '1',
            height: '200px',
            backgroundColor: 'lightblue', // fallback 배경색 => 이거 뭐로 바꾸지
            backgroundImage: `url(${backgroundImageUrl})`, // backgroundImage 사용
            backgroundSize: 'cover', // 이미지를 배경으로 설정하고 크기 조절
            backgroundPosition: 'center', // 배경 이미지의 위치
            cursor: 'pointer',
            transition: 'flex 1.5s ease, transform 1.5s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            color: 'white',
            transform: isSelected ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          <span style={{ opacity: 0 }}>{dest.title_NM}</span>
        </div>
      );
    });
  };

  // 장소 이름을 이용해 이미지를 가져오는 함수
  const fetchImage = async (placeName) => {
    try {
      // console.log(`Fetching image for place: ${placeName}`);
      const response = await axios.get('http://localhost:8080/api/search/place-photo', {
        params: { query: placeName },
      });

      // console.log(`Full API response for ${placeName}:`, response);

      const place = response.data.candidates[0];
      if (place && place.photos && place.photos.length > 0) {
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=AIzaSyCTVgQ9PgD16SIcmOd16eT2TuYl5OwhCY0`;
        // console.log(`Photo URL for ${placeName}:`, photoUrl);
        return photoUrl;
      } else {
        // console.log(`No photo available for ${placeName}`);
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

    // console.log('Fetched images:', newImages);
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

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'left' }}>촬영지 미리보기</h2>
      <div style={{ display: 'flex', overflow: 'hidden', width: '100%', maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
        <button
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: '2px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '24px',
            cursor: 'pointer',
            zIndex: 1,
          }}
        >
          &#9664;
        </button>
        {/* 이미 가져온 캠핑장 데이터 화면에 렌더링 */}
        {renderSlides()}
        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: '2px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '24px',
            color: '#fff',
            cursor: 'pointer',
            zIndex: 1,
          }}
        >
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default FamousTravel;