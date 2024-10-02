import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import GoogleMap from './GoogleMap';
import { FaChevronLeft } from 'react-icons/fa';


const LocationInformationComponent = () => {
  const { contentTitle, placeName } = useParams();  // URL 파라미터에서 contentTitle과 placeName 가져오기

  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [layerImage, setLayerImage] = useState(null); // Layer 이미지 상태
  const [placePhoto, setPlacePhoto] = useState(null);  // Google Place 사진 상태
  const [thumbnails, setThumbnails] = useState([]);  // 썸네일 데이터 상태
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    // 촬영지 데이터 가져오기
    axios.get(`http://localhost:8080/content/getInformationByTitleAndPlace?title=${contentTitle}&place=${placeName}`)
      .then(response => {
        setLocationData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("촬영지 정보 데이터를 가져오는 중 오류가 발생했습니다.");
        setLoading(false);
      });

    // Layer 이미지 가져오기
    axios.get(`http://localhost:8080/layer/all`)
      .then(response => {
        const matchedLayer = response.data.find(layer => layer.place_name === placeName);
        if (matchedLayer) {
          setLayerImage(`http://localhost:8080/layer/files/${matchedLayer.countNum}`);
        }
      })
      .catch(error => {
        console.error("Layer 이미지를 가져오는 중 에러 발생!", error);
      });

    // Google Place 사진 가져오기
    axios.get(`http://localhost:8080/api/search/place-photo?query=${placeName}`)
      .then(response => {
        const photoUrl = response.data.photoUrl; // 백엔드에서 Google Photo URL 전달받음
        setPlacePhoto(photoUrl);
      })
      .catch(error => {
        console.error("Google Place 사진을 가져오는 중 에러 발생!", error);
      });

    // 썸네일 데이터 가져오기
    axios.get('http://localhost:8080/thumbnails/all')
      .then(response => {
        setThumbnails(response.data);
      })
      .catch(error => {
        console.error("썸네일 데이터를 가져오는 중 에러 발생!", error);
      });

  }, [contentTitle, placeName]);

  // 영화 제목에 해당하는 썸네일 찾기
  const findThumbnail = (title) => {
    const matchedThumbnail = thumbnails.find(thumbnail => thumbnail.title_nm === title);
    if (matchedThumbnail) {
      // 이미지 확장자가 없으면 기본적으로 jpg를 추가
      const imageName = matchedThumbnail.image_Name;
      return imageName.includes('.') ? imageName : `${imageName}.jpg`;  // 확장자가 없으면 .jpg 추가
    }
    return null;
  };

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

  return (
    <div className="relative w-full h-auto overflow-hidden rounded-lg shadow-lg">
      {/* 뒤로 가기 버튼 */}
      <button
        onClick={() => navigate(-1)}
        className="absolute z-50 p-2 shadow top-4 left-4 text-white"
        style={{ width: '50px', height: '50px', fontSize: '20px', fontWeight: 'bold',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
      >
  <FaChevronLeft />
  </button>

      {/* 이미지 배경 (Google Place 사진, 썸네일 이미지 또는 Layer 이미지) */}
      <div className="relative">
        <img
          src={placePhoto || (findThumbnail(contentTitle) && `http://localhost:8080/thumbnails/images/${findThumbnail(contentTitle)}`)}
          alt={placeName}
          className="object-cover w-full h-100"
        />
        <div className="absolute bottom-0 left-0 w-full p-1 text-white">
          <h2 className="text-xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)' }}>{placeName}</h2>
          <p className="text-base text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)' }}>{contentTitle}</p>

        </div>
      </div>
      {/* 상세 정보 섹션 */}
      <div className="p-2 text-sm text-left bg-[#f5f3f3]">
        <p className='text-center font-semibold text-lg'>"{locationData.relate_PLACE_DC}"</p><br />
        <p><strong className="pl-2 text-left font-semibold">주소 - </strong> {locationData.addr}</p>
        <p><strong className="pl-2 text-left font-semibold">영업 -</strong> {locationData.oper_TIME} 브레이크 타임 - {locationData.rest_TIME}</p>
        {/* <p><strong className="font-semibold">Guidance:</strong> {locationData.relate_PLACE_DC}</p> */}
        <p><strong className="pl-2 text-left font-semibold">전화 - </strong>0{locationData.tel_NO}</p>
      </div>


      <div>
        {/* GoogleMap 컴포넌트를 맨 아래에 배치 */}
        <GoogleMap
          latitude={locationData.lc_LA}
          longitude={locationData.lc_LO}
          placeName={placeName}
        />
        <br />
        <br />
        <br />
      </div>

      {/* 버튼 섹션 */}
      <div>
        {layerImage && (
          <button
            onClick={() => navigate('/camera', { state: { layerImage } })}
            className="w-[95%] fixed bottom-5 left-1/2 transform -translate-x-1/2 py-3 transition duration-300 rounded-2xl text-[#79353e] font-bold bg-gray-100"
            style={{ zIndex: 10 }} // 다른 요소들 위에 표시되도록 z-index 추가
          >
            명장면 따라 찍기
          </button>
        )}
      </div>

    </div>
  );
};

export default LocationInformationComponent;
