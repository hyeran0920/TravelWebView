// GoogleMap.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GoogleMap = ({ latitude, longitude, placeName }) => {
  const [googleApiKey, setGoogleApiKey] = useState('');

  useEffect(() => {
    // 백엔드에서 Google Maps API 키 가져오기
    axios.get('http://localhost:8080/api/google-maps-api-key')  // 백엔드에서 API 키 가져오기
      .then(response => {
        setGoogleApiKey(response.data);  // API 키 설정
      })
      .catch(error => {
        console.error("Google Maps API 키를 가져오는 중 에러 발생!", error);
      });
  }, []);

  useEffect(() => {
    if (googleApiKey) {
      const initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },  // 위도 경도 중심 설정
          zoom: 15,
        });

        // 마커 추가
        new window.google.maps.Marker({
          position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
          map: map,
          title: placeName,
        });
      };

      // Google Maps API 로드
      const loadGoogleMapsScript = () => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`;  // 백엔드에서 받은 API 키 사용
        script.async = true;
        script.defer = true;
        script.onload = initMap;
        document.head.appendChild(script);
      };

      if (!window.google) {
        loadGoogleMapsScript();
      } else {
        initMap();
      }
    }
  }, [googleApiKey, latitude, longitude, placeName]);

  return <div id="map" className="w-full h-80 " 
         style={{ margin: 0, padding: 0 }}  // padding과 margin 제거
         ></div>;  // 지도를 표시할 div
};

export default GoogleMap;