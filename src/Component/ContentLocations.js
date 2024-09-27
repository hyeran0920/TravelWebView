import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ContentLocations = ({ contentTitle }) => {
  const [locations, setLocations] = useState([]);  // 촬영지 목록 상태
  const [thumbnails, setThumbnails] = useState([]); // 썸네일 목록 상태
  const [layers, setLayers] = useState([]);        // Layer 데이터를 저장할 상태
  const [loading, setLoading] = useState(true);    // 로딩 상태 관리
  const [error, setError] = useState(null);        // 에러 상태 추가
  const navigate = useNavigate();  // useNavigate 사용

  useEffect(() => {
    setLoading(true);

    // 촬영지 데이터를 가져옴 (영화 제목을 기준으로)
    axios.get(`http://localhost:8080/content/getLocationsAndAddressesByTitle?title=${contentTitle}`)
      .then(response => {
        setLocations(response.data);  // 응답 데이터를 상태로 설정 (촬영지 리스트)
        setLoading(false);           // 로딩 완료
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
        console.error("썸네일 데이터 가져오는 중 에러 발생!", error);
      });

  }, [contentTitle]);

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

  // 레이어에서 해당 촬영지의 이미지를 찾음
  const findLayerImage = (placeName) => {
    const matchedLayer = layers.find(layer => layer.place_name === placeName);
    if (matchedLayer) {
      return `http://localhost:8080/layer/files/${matchedLayer.countNum}`;
    }
    return null; // 이미지가 없으면 null 반환
  };

  // 썸네일에서 해당 영화 제목에 맞는 썸네일을 찾음
  const findThumbnailImage = (title_nm) => {
  
    const matchedThumbnail = thumbnails.find(thumbnail => thumbnail.title_nm === title_nm);
    
    if (matchedThumbnail) {
      // 이미지 확장자가 없으면 기본적으로 jpg를 추가
      const imageName = matchedThumbnail.image_Name;
      return imageName.includes('.') ? imageName : `${imageName}.jpg`;  // 확장자가 없으면 .jpg 추가
    }
    
    return null;
  };
  

  // 장소 박스를 클릭하면 해당 작품의 장소를 선택하고 페이지로 이동
  const handlePlaceClick = (contentTitle, placeName) => {
    navigate(`/InformationByPlace/${contentTitle}/${placeName}`); // 제목과 장소로 URL 이동
  };

  // 썸네일 이미지 URL을 가져옴
  const thumbnailUrl = findThumbnailImage(contentTitle);  // 여기서 contentTitle을 사용

  return (
    <div className="p-5 mb-10">
      {/* 썸네일 이미지 표시 */}
      {thumbnailUrl && (
        <img
          src={`http://localhost:8080/thumbnails/images/${thumbnailUrl}`} // 확장자를 포함한 이미지 URL
          alt={`${contentTitle} 썸네일`}  // 'title' 대신 'contentTitle'을 사용
          className="object-cover w-full h-64 mb-5" // 원하는 크기로 스타일링
        />
      )}

      <h2 className="mb-5 text-2xl font-bold"> # {contentTitle}</h2>

      <div className="grid grid-cols-1 gap-6">
        {locations.map((location, index) => {
          const imageUrl = findLayerImage(location.place_Name);
          return (
            <div
              key={index}
              onClick={() => handlePlaceClick(contentTitle, location.place_Name)} // contentTitle과 place_Name 전달
              className="relative flex flex-col justify-between h-40 p-5 overflow-hidden rounded-lg shadow-md"
              style={{
                backgroundColor: imageUrl ? 'transparent' : '#007BFF', // 이미지가 없으면 파란색 배경 적용
              }}
            >
              {/* 이미지가 있으면 출력 */}
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={location.place_Name}
                  className="absolute inset-0 object-cover w-full h-full"
                />
              )}

              <div className="absolute bottom-0 left-0 w-full p-5 text-lg font-bold text-left text-white bg-black bg-opacity-50">
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