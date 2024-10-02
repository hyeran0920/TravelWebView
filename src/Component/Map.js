import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Leaflet에서 마커 아이콘을 설정 (기본 아이콘 경로 수정)
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

// 커스텀 마커 아이콘 생성 (빨간색)- 촬영지
const redIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41], // 기본 마커 크기
  iconAnchor: [12, 41], // 앵커 포인트 (아이콘의 하단 중앙을 지정)
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// 커스텀 마커 아이콘 생성 (초록색) - 맛집
const greenIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  iconSize: [25, 41], // 기본 마커 크기
  iconAnchor: [12, 41], // 앵커 포인트 (아이콘의 하단 중앙을 지정)
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const OpenStreetMapComponent = () => {
  const [allContentPlaceList, setAllContentPlaceList] = useState([]); // 전체 촬영지 리스트
  const [allFoodPlaceList, setAllFoodPlaceList] = useState([]); //전체 맛집 리스트
  const [error, setError] = useState(null); // 에러 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [userLocation, setUserLocation] = useState([37.5665, 126.9780]); // 기본 위치는 서울
  const [mapKey, setMapKey] = useState(0); // 지도 재렌더링을 위한 key 값

  // 사용자의 위치를 가져오는 함수
  const handleSearchMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]); // 사용자 위치를 지도 중심으로 설정
          setMapKey((prevKey) => prevKey + 1); // 지도 강제 재렌더링을 위한 key 값 갱신
        },
        (error) => {
          console.error("위치 허용이 차단되었습니다. 기본 위치로 설정합니다.");
          setUserLocation([37.5665, 126.9780]); // 허용 차단 시 기본 서울 위치
          setMapKey((prevKey) => prevKey + 1); // 지도 강제 재렌더링을 위한 key 값 갱신
        }
      );
    } else {
      console.error("Geolocation이 지원되지 않는 브라우저입니다.");
      setUserLocation([37.5665, 126.9780]); // Geolocation 미지원 시 기본 서울 위치
      setMapKey((prevKey) => prevKey + 1); // 지도 강제 재렌더링을 위한 key 값 갱신
    }
  };

  useEffect(() => {
    // 촬영지 데이터를 가져오기
    setLoading(true);
    axios
      .get('http://localhost:8080/content/map')
      .then((response) => {
        setAllContentPlaceList(response.data); // 응답 데이터를 상태로 설정 (문자열 리스트)
        setLoading(false); // 로딩 완료
      })
      .catch((error) => {
        console.error('데이터 가져오는 중 에러 발생!', error);
        setError('데이터를 가져오는 중 오류가 발생했습니다.'); // 에러 메시지 설정
        setLoading(false); // 에러 발생 시 로딩 종료
      });
  }, []);


  useEffect(() => {
    // 맛집 데이터를 가져오기
    setLoading(true);
    axios
      .get('http://localhost:8080/food/map')
      .then((response) => {
        setAllFoodPlaceList(response.data); // 응답 데이터를 상태로 설정 (문자열 리스트)
        setLoading(false); // 로딩 완료
      })
      .catch((error) => {
        console.error('데이터 가져오는 중 에러 발생!', error);
        setError('데이터를 가져오는 중 오류가 발생했습니다.'); // 에러 메시지 설정
        setLoading(false); // 에러 발생 시 로딩 종료
      });
  }, []);


  // 로딩 중일 때 표시
  if (loading) {
    return <p>Loading places on map...</p>;
  }

  // 에러 발생 시 표시
  if (error) {
    return <p>{error}</p>;
  }

  // 데이터가 없을 경우 처리
  if (allContentPlaceList.length === 0) {
    return <p>No content places on map available.</p>;
  }

    // 데이터가 없을 경우 처리
    if (allFoodPlaceList.length === 0) {
      return <p>No food places on map available.</p>;
    }

  return (
    <div className="flex flex-col h-screen">
      {/* 내 위치 검색 버튼 */}
      <div className="text-center my-3">
        <button onClick={handleSearchMyLocation} className="px-4 py-2 bg-blue-500 text-white rounded">
          내 위치 검색
        </button>
      </div>

      {/* 지도 영역 */}
      <div className="flex-grow">
        <MapContainer key={mapKey} center={userLocation} zoom={15} className="w-full h-full">
          {/* OpenStreetMap 타일 레이어 추가 */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* 마커들을 추가 */}
          {allContentPlaceList.map((location, index) => (
            <Marker key={index} position={[location.lc_LA, location.lc_LO]} icon={redIcon}>
              <Popup>{location.place_Name}<br /> {location.title_NM} <br /> {location.addr}</Popup> {/* 마커 클릭 시 표시할 팝업 */}
            </Marker>
          ))}

          {/* 마커들을 추가 */}
          {allFoodPlaceList.map((location, index) => (
            <Marker key={index} position={[location.foodMapLatPos, location.foodMapLotPos]} icon={greenIcon}>
              <Popup>{location.foodMapPlaceName}<br /> {location.foodMapRoadAddr}</Popup> {/* 마커 클릭 시 표시할 팝업 */}
            </Marker>
          ))}

        </MapContainer>
      </div>

      {/* 하단 바 영역 */}
      <div className="bg-gray-800 text-white text-center py-3">
        하단 바 내용 (예: 네비게이션 바)
      </div>
    </div>
  );
};

export default OpenStreetMapComponent;
