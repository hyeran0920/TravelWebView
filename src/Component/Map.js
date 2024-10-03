import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { BiCurrentLocation } from 'react-icons/bi';  // 또는 MdMyLocation 사용 가능

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

// 커스텀 마커 아이콘 생성 (오렌지) - 축제
const orangeIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  iconSize: [25, 41], // 기본 마커 크기
  iconAnchor: [12, 41], // 앵커 포인트 (아이콘의 하단 중앙을 지정)
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const OpenStreetMapComponent = () => {
  const [allContentPlaceList, setAllContentPlaceList] = useState([]); // 전체 촬영지 리스트
  const [allFoodPlaceList, setAllFoodPlaceList] = useState([]); //전체 맛집 리스트
  const [currentFestivalList, setCurrentFestivalList] = useState([]); // 진행중인 축제 리스트
  const [selectedLocation, setSelectedLocation] = useState(null); // 선택된 마커 정보
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

  useEffect(() => {
    // 촬영지 데이터를 가져오기
    setLoading(true);
    axios
      .get('http://localhost:8080/festival/current')
      .then((response) => {
        setCurrentFestivalList(response.data); // 응답 데이터를 상태로 설정 (문자열 리스트)
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

  if (allFoodPlaceList.length === 0) {
    return <p>No food places on map available.</p>;
  }

  return (
    <div className="relative flex flex-col h-screen">
      <style>
        {`
          .leaflet-control-zoom {
            top: 600px !important; /* 확대/축소 버튼을 아래로 70px 이동 */
          }

          .location-icon {
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 아이콘에 그림자 추가 */
          }
        `}
      </style>
      {/* 내 위치 검색 버튼 */}
      <div className="fixed bottom-20 right-2 z-[100]">
        <button onClick={handleSearchMyLocation} className="px-4 py-2 text-gray-600">
          <BiCurrentLocation size={40} className="location-icon" color='blue' />
        </button>
      </div>

      {/* 지도 영역 */}
      <div className="flex-grow relative">
        <MapContainer key={mapKey} center={userLocation} zoom={15} className="w-full h-full z-0">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* 촬영지 마커들 */}
          {allContentPlaceList.map((location, index) => (
            <Marker
              key={index}
              position={[location.lc_LA, location.lc_LO]}
              icon={redIcon}
              eventHandlers={{
                click: () => {
                  setSelectedLocation({
                    placeName: location.place_Name,
                    title: location.title_NM,
                    address: location.addr
                  });
                },
              }}
            />
          ))}

          {/* 맛집 마커들 */}
          {allFoodPlaceList.map((location, index) => (
            <Marker
              key={index}
              position={[location.foodMapLatPos, location.foodMapLotPos]}
              icon={greenIcon}
              eventHandlers={{
                click: () => {
                  setSelectedLocation({
                    placeName: location.foodMapPlaceName,
                    address: location.foodMapRoadAddr
                  });
                },
              }}
            />
          ))}

          {/* 현재 진행 축제 마커들 */}
          {currentFestivalList.map((location, index) => (
            <Marker
              key={index}
              position={[location.festival_la, location.festival_lo]}
              icon={orangeIcon}
              eventHandlers={{
                click: () => {
                  setSelectedLocation({
                    placeName: location.festival_name,
                    address: location.festival_addr,
                    startdate : location.festival_begin_date,
                    enddate : location.festival_end_date,
                    hompage : location.festival_homepage
                  });
                },
              }}
            />
          ))}

        </MapContainer>
      </div>

      {/* 하단 바 영역 (선택된 마커 정보 표시) */}
      {selectedLocation && (
        <div
          className="fixed left-1/2 transform -translate-x-1/2 w-[90%] bg-white text-black text-center py-3 z-50 rounded-lg p-2"
          style={{ bottom: '60px' }}
        >
          <p className="text-lg"><strong>{selectedLocation.placeName}</strong></p>
          {selectedLocation.title && <p>{selectedLocation.title}</p>}

          <p>{selectedLocation.address}</p>

          {selectedLocation.startdate && selectedLocation.enddate && 
          (<p>{selectedLocation.startdate} ~ {selectedLocation.enddate}</p>)
          }

          {selectedLocation.hompage && (
            <p >
              <a className="text-blue-500 font-bold" href={selectedLocation.hompage} target="_blank" rel="noopener noreferrer">
                홈페이지 바로가기 &gt;
              </a>
            </p>
          )}

        </div>
      )}
    </div>
  );
};

export default OpenStreetMapComponent;
