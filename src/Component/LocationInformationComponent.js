import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // useNavigate 추가

const LocationInformationComponent = () => {
  const { contentTitle, placeName } = useParams();  // URL 파라미터에서 contentTitle과 placeName 가져오기
  
  const [locationData, setLocationData] = useState(null);  // 촬영지 데이터 상태 (단일 객체로 변경)
  const [loading, setLoading] = useState(true);    // 로딩 상태 관리
  const [error, setError] = useState(null);        // 에러 상태 추가
  const [layerImage, setLayerImage] = useState(null); // Layer 이미지 상태
  const navigate = useNavigate();  // 뒤로 가기 버튼을 위한 useNavigate 추가

  useEffect(() => {
    setLoading(true);

    // 촬영지 데이터를 가져옴 (제목과 장소 기준으로 필터링)
    axios.get(`http://localhost:8080/content/getInformationByTitleAndPlace?title=${contentTitle}&place=${placeName}`)
      .then(response => {
        setLocationData(response.data);  // 응답 데이터를 상태로 설정 (촬영지 정보)
        setLoading(false);               // 로딩 완료
      })
      .catch(error => {
        console.error("촬영지 정보 데이터를 가져오는 중 에러 발생!", error);
        setError("촬영지 정보 데이터를 가져오는 중 오류가 발생했습니다."); // 에러 메시지 설정
        setLoading(false);  // 에러 발생 시 로딩 종료
      });

    // 해당 장소에 대한 Layer 이미지 가져오기
    axios.get(`http://localhost:8080/layer/all`)
      .then(response => {
        const matchedLayer = response.data.find(layer => layer.place_name === placeName); // 장소 이름이 같은 Layer 검색
        if (matchedLayer) {
          setLayerImage(`http://localhost:8080/layer/files/${matchedLayer.countNum}`); // countNum에 맞는 이미지 경로 설정
        }
      })
      .catch(error => {
        console.error("Layer 이미지를 가져오는 중 에러 발생!", error);
      });
    
  }, [contentTitle, placeName]);

  // 로딩 중일 때 표시
  if (loading) {
    return <p className="text-center text-gray-600">Loading filming location information...</p>;
  }

  // 에러 발생 시 표시
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // 데이터가 없을 경우 처리
  if (!locationData) {
    return <p className="text-center text-gray-600">No filming location information available for {contentTitle} at {placeName}.</p>;
  }

  // 촬영지 상세 데이터 렌더링
  return (
<div className="relative w-full h-screen overflow-hidden bg-gray-300 rounded-lg shadow-lg">
      
      {/* 뒤로 가기 버튼 */}
      <button
        onClick={() => navigate(-1)}  // 뒤로 가기 기능
        className="absolute z-50 p-2 bg-gray-100 rounded-full shadow top-4 left-4 text-black-500 hover:bg-gray-300"  // z-index 추가
        style={{ width: '50px', height: '50px', fontSize: '20px', fontWeight: 'bold' }}  // 버튼 크기 및 텍스트 크기 설정
      >
        &lt; {/* '<' 기호 */}
      </button>

      {/* 이미지 배경 */}
      <div className="relative">
        <img 
          src={layerImage || "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20140701_175%2Fdarkrever3_1404215295678CvFGV_JPEG%2FKakaoTalk_20140701_203820248.jpg&type=a340"}  // Layer 이미지가 있으면 출력, 없으면 기본 이미지
          alt={placeName}
          className="object-cover w-full h-60"
        />
        <div className="absolute bottom-0 left-0 w-full p-1 text-white bg-black bg-opacity-30">
          <h2 className="text-2xl font-bold">{placeName}</h2>
          <p className="text-sm">{contentTitle}</p>
        </div>
      </div>

      {/* 상세 정보 섹션 */}
      <div className="p-6 space-y-4">
        <p><strong className="font-semibold">Title:</strong> {locationData.title_NM}</p>
        <p><strong className="font-semibold">Place:</strong> {locationData.place_Name}</p>
        <p><strong className="font-semibold">Description:</strong> {locationData.relate_PLACE_DC}</p>
        <p><strong className="font-semibold">Operating Time:</strong> {locationData.oper_TIME}</p>
        <p><strong className="font-semibold">Rest Time:</strong> {locationData.rest_TIME}</p>
        <p><strong className="font-semibold">Guidance:</strong> {locationData.relate_PLACE_DC}</p>
        <p><strong className="font-semibold">Address:</strong> {locationData.addr}</p>
        <p><strong className="font-semibold">Latitude:</strong> {locationData.lc_LA}</p>
        <p><strong className="font-semibold">Longitude:</strong> {locationData.lc_LO}</p>
        <p><strong className="font-semibold">Telephone:</strong> {locationData.tel_NO}</p>
      </div>

      {/* 버튼 섹션 */}
      <div className="p-6">
        {layerImage && (
          <button 
            onClick={() => navigate('/camera', { state: { layerImage } })}  // 카메라 화면으로 이동할 때 layerImage 넘김
            className="w-full py-3 text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            명장면 따라 찍기
          </button>
        )}
      </div>
    </div>
  );
};

export default LocationInformationComponent;
