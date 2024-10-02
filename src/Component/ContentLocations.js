import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NearbyContentPlace from './NearbyContentPlace'; // NearbyPlace 컴포넌트 임포트

const ContentLocations = ({ contentTitle }) => {
  const [locations, setLocations] = useState([]);  // 촬영지 목록 상태
  const [sortedLocations, setSortedLocations] = useState([]); // 정렬된 장소 상태
  const [isLocationAllowed, setIsLocationAllowed] = useState(false); // 위치 허용 여부 상태 추가
  const [distances, setDistances] = useState([]); // 거리 정보 저장 상태
  const [thumbnails, setThumbnails] = useState([]); // 썸네일 목록 상태
  const [layers, setLayers] = useState([]);        // Layer 데이터를 저장할 상태
  const [loading, setLoading] = useState(true);    // 로딩 상태 관리
  const [error, setError] = useState(null);        // 에러 상태 추가
  const [images, setImages] = useState({});        // 이미지를 저장할 상태
  const navigate = useNavigate();  // useNavigate 사용

  useEffect(() => {
    setLoading(true);

    // 촬영지 데이터를 가져옴 (영화 제목을 기준으로) + 위도 경도까지.
    axios.get(`http://localhost:8080/content/getLocationsAndAddressesByTitle?title=${contentTitle}`)
      .then(response => {
        setLocations(response.data);  // 응답 데이터를 상태로 설정 (촬영지 리스트)
        setLoading(false);           // 로딩 완료
        fetchImagesForLocations(response.data); // 이미지 가져오기
      })
      .catch(error => {
        console.error("촬영지 데이터를 가져오는 중 에러 발생!", error);
        setError("촬영지 데이터를 가져오는 중 오류가 발생했습니다."); // 에러 메시지 설정
        setLoading(false);  // 에러 발생 시 로딩 종료
      });

    // Layer 데이터를 가져옴
    axios.get('http://localhost:8080/layer/all')
      .then(response => {
        setLayers(response.data); // 레이어 데이터를 상태로 설정
      })
      .catch(error => {
        console.error("Layer 데이터를 가져오는 중 에러 발생!", error);
      });

    // 썸네일 데이터 가져오기
    axios.get('http://localhost:8080/thumbnails/all')
      .then(response => {
        setThumbnails(response.data);
      })
      .catch(error => {
        console.error("썸네일 데이터를 가져오는 중 에러 발생!", error);
      });

  }, [contentTitle]);

  // 장소 이름을 이용해 이미지를 가져오는 함수
  const fetchImage = async (placeName) => {
    try {
      const response = await axios.get('http://localhost:8080/api/search/place-photo', {
        params: { query: placeName },  // 장소 이름을 query 파라미터로 전달
      });

      const place = response.data.candidates[0];
      if (place && place.photos && place.photos.length > 0) {
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=AIzaSyCTVgQ9PgD16SIcmOd16eT2TuYl5OwhCY0`;
      }
    } catch (error) {
      console.error(`Error fetching image for ${placeName}:`, error);
    }

    return null;
  };

  // 모든 장소에 대해 이미지를 가져오는 함수
  const fetchImagesForLocations = async (locations) => {
    const newImages = {};

    for (const location of locations) {
      const imageUrl = await fetchImage(location.place_Name);  // 장소명으로 이미지 가져오기
      if (imageUrl) {
        newImages[location.place_Name] = imageUrl;
      }
    }

    setImages(newImages);  // 이미지 상태 업데이트
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
  if (locations.length === 0) {
    return <p>No filming locations available for {contentTitle}.</p>;
  }

  // 썸네일에서 해당 영화 제목에 맞는 썸네일을 찾음
  const findThumbnailImage = (title_nm) => {
    const matchedThumbnail = thumbnails.find(thumbnail => thumbnail.title_nm === title_nm);
    if (matchedThumbnail) {
      const imageName = matchedThumbnail.image_Name;
      return imageName.includes('.') ? imageName : `${imageName}.jpg`;  // 확장자가 없으면 .jpg 추가
    }
    return null;
  };

  // 썸네일 이미지 URL을 가져옴
  const thumbnailUrl = findThumbnailImage(contentTitle);

  // 장소 박스를 클릭하면 해당 작품의 장소를 선택하고 페이지로 이동
  const handlePlaceClick = (contentTitle, placeName) => {
    navigate(`/InformationByPlace/${contentTitle}/${placeName}`); // 제목과 장소로 URL 이동
  };

  // 정렬된 장소를 NearbyPlace에서 받아 처리
  const handleSortedPlaces = (sortedPlaces) => {
    setSortedLocations(sortedPlaces); // 정렬된 리스트로 업데이트
  };

  // 위치 허용 여부를 NearbyPlace에서 받아 처리
  const handleLocationAllowed = (isAllowed, distances = []) => {
    setIsLocationAllowed(isAllowed);
    setDistances(distances); // 거리 정보를 업데이트
  };

  // 최종 렌더링할 장소 리스트
  const renderLocations = sortedLocations.length > 0 ? sortedLocations : locations;

  return (
    <div>
      <div className="relative w-full h-full"> {/* 상대적 위치 설정 */}
        <img
          src={`http://localhost:8080/thumbnails/images/${thumbnailUrl}`}  // 확장자를 포함한 이미지 URL
          alt={`${contentTitle} 썸네일`}  // 'contentTitle'을 사용
          className="object-cover w-full h-full mb-2" // 이미지 스타일
        />      
        <h2 className="absolute bottom-0 left-0 w-full p-4 text-2xl font-bold text-white shadow-2xl">
          # {contentTitle}
        </h2>     
      </div>
      {/* NearbyPlace 컴포넌트로 글자순, 거리순 정렬 처리 */}
      <NearbyContentPlace places={locations} onSorted={handleSortedPlaces} onLocationAllowed={handleLocationAllowed} />
      <div className="grid grid-cols-1 gap-6 mt-5">
        {renderLocations.map((location, index) => {
          // 해당 장소의 이미지를 우선 가져오고, 없으면 썸네일 이미지로 대체
          const backgroundImageUrl = images[location.place_Name]
            ? images[location.place_Name]
            : thumbnailUrl ? `http://localhost:8080/thumbnails/images/${thumbnailUrl}` : '#007BFF'; // 썸네일이 없으면 파란 배경
          return (
            <div
              key={index}
              onClick={() => handlePlaceClick(contentTitle, location.place_Name)} // contentTitle과 place_Name 전달
              className="relative flex flex-col justify-between h-40 p-5 overflow-hidden rounded-lg shadow-md"
              style={{
                backgroundImage: `url(${backgroundImageUrl})`, // 이미지가 있으면 배경으로 설정
                backgroundColor: '#007BFF', // 파란색 배경 (이미지가 없을 때)
                backgroundSize: 'cover', // 이미지 크기 설정
                backgroundPosition: 'center', // 이미지 위치 설정
              }}
            >
              <div className="absolute bottom-0 left-0 w-full p-2 text-lg font-bold text-left text-white">
                <div className="absolute text-sm text-white top-2 right-4">
                  {isLocationAllowed && location.distance ? `${location.distance} km` : ''}
                </div>
                {location.place_Name}
                <p className="mt-1 text-sm text-gray-200">
                  {location.addr}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentLocations;
