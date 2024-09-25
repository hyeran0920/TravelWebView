import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ContentLocations = ({ contentTitle }) => {
  const [locations, setLocations] = useState([]);  // 촬영지 목록 상태
  const [loading, setLoading] = useState(true);    // 로딩 상태 관리
  const [error, setError] = useState(null);        // 에러 상태 추가
  const navigate = useNavigate();  // useNavigate 사용

  useEffect(() => {
    setLoading(true);
    
    // Axios 요청으로 촬영지 데이터를 가져옴 (영화 제목을 기준으로 필터링)
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

  return (
    <div className="p-5 mb-10">
    <h2 className="text-2xl font-bold mb-5"> # {contentTitle}</h2>
    
    <div className="grid grid-cols-1 gap-6">
      {locations.map((location, index) => (
        <div
          key={index}
          onClick={() => handlePlaceClick(contentTitle, location.place_Name)} // contentTitle과 place_Name 전달
          className="bg-white shadow-md rounded-lg overflow-hidden h-40 p-5 flex flex-col justify-between relative"
        >
          <div className="absolute bottom-0 left-0 p-5 text-left font-bold text-lg text-gray-800 ">
            {location.place_Name}
            <p className="text-sm text-gray-400 mt-1">
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
