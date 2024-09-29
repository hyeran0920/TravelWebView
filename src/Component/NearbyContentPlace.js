import React, { useState } from 'react';

const NearbyContentPlace = ({ places, onSorted, onLocationAllowed }) => {
  const [sortedPlaces, setSortedPlaces] = useState([]); // 정렬된 장소 리스트
  const [isLocationAllowed, setIsLocationAllowed] = useState(false); // 위치 허용 여부

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // 지구 반경 (단위: km)
    const dLat = (lat2 - lat1) * (Math.PI / 180); // 위도 차이
    const dLon = (lon2 - lon1) * (Math.PI / 180); // 경도 차이
    const lat1Rad = lat1 * (Math.PI / 180);
    const lat2Rad = lat2 * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // 거리 계산
  };

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;

          // 장소를 가까운 순으로 정렬하고 각 장소에 거리 값을 추가
          const sortedList = places.map(place => {
            if (place.lc_LA && place.lc_LO) { // 좌표 값이 있는지 확인
              const distance = calculateDistance(userLat, userLon, place.lc_LA, place.lc_LO);
              return {
                ...place,
                distance: distance.toFixed(2) // 거리값 소수점 두 자리까지 계산 (예: 2.52 km)
              };
            } else {
              return {
                ...place,
                distance: 'N/A' // 좌표가 없을 경우 처리
              };
            }
          }).sort((place1, place2) => parseFloat(place1.distance) - parseFloat(place2.distance));

          const distances = sortedList.map((place) => place.distance);
          setSortedPlaces(sortedList); // 컴포넌트 내부 상태 업데이트
          onSorted(sortedList); // 부모 컴포넌트로 정렬된 데이터 전달
          onLocationAllowed(true, distances); // 부모 컴포넌트로 위치 허용 여부 전달 및 거리 정보 전달
          setIsLocationAllowed(true); // 위치 허용 상태 설정
        },
        (error) => {
          alert('위치 권한이 차단되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.');
          onLocationAllowed(false); // 위치 차단 시 부모 컴포넌트에 알림
          setSortedPlaces(places); // 기본 장소 리스트로 설정
        }
      );
    } else {
      console.error("Geolocation을 지원하지 않는 브라우저입니다.");
    }
  };

  // 글자순 정렬 처리
  const handleAlphabeticalSort = () => {
    if (isLocationAllowed) {
      // 위치 허용된 경우: 거리 포함해서 글자순 정렬
      const sortedByAlphabetWithDistance = [...sortedPlaces].sort((a, b) => a.place_Name.localeCompare(b.place_Name));
      setSortedPlaces(sortedByAlphabetWithDistance); // 정렬된 리스트 업데이트
      onSorted(sortedByAlphabetWithDistance); // 부모 컴포넌트로 정렬된 리스트 전달
    } else {
      // 위치 차단된 경우: 거리 없이 글자순 정렬
      const sortedByAlphabet = [...places].sort((a, b) => a.place_Name.localeCompare(b.place_Name));
      setSortedPlaces(sortedByAlphabet); // 정렬된 리스트 업데이트
      onSorted(sortedByAlphabet); // 부모 컴포넌트로 정렬된 리스트 전달
    }
  };

  return (
    <div className="flex space-x-4">
      <button onClick={handleAlphabeticalSort} className="p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-105">
        글자순
      </button>
      <button onClick={requestLocation} className="p-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out transform hover:scale-105">
        거리순
      </button>
    </div>
  );
};

export default NearbyContentPlace;
