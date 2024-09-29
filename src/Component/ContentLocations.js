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
  const navigate = useNavigate();  // useNavigate 사용

  useEffect(() => {
    setLoading(true);

    // 촬영지 데이터를 가져옴 (영화 제목을 기준으로) + 위도 경도까지.
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
        console.error("썸네일 데이터를 가져오는 중 에러 발생!", error);
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
    <div className="p-5 mb-10">
      <h2 className="mb-5 text-2xl font-bold"> # {contentTitle}</h2>

      {/* NearbyPlace 컴포넌트로 글자순, 거리순 정렬 처리 */}
      <NearbyContentPlace places={locations} onSorted={handleSortedPlaces} onLocationAllowed={handleLocationAllowed} />

      <div className="grid grid-cols-1 gap-6 mt-5">
        {renderLocations.map((location, index) => (
          <div
            key={index}
            onClick={() => handlePlaceClick(contentTitle, location.place_Name)} // contentTitle과 place_Name 전달
            className="relative flex flex-col justify-between h-40 p-5 overflow-hidden rounded-lg shadow-md"
            style={{
              backgroundColor: '#007BFF', // 파란색 배경
            }}
          >
           
            <div className="absolute bottom-0 left-0 w-full p-5 text-lg font-bold text-left text-white bg-black bg-opacity-50">
               <div className="absolute top-2 right-4 text-white text-sm">{isLocationAllowed && location.distance ? `${location.distance} km` : ''}</div>
               {location.place_Name} 
              
              <p className="mt-1 text-sm text-gray-200">
                {location.addr}   
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentLocations;
