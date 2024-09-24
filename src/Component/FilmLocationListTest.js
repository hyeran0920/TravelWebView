import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FilmLocationList = () => {
  // 상태값을 빈 배열로 초기화
  const [locations, setLocations] = useState([]); // 빈 배열로 초기화하여 undefined 방지
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    // 데이터 로딩 시작
    setLoading(true);
    
    // API 호출
    axios.get('http://localhost:8080/content/all')
      .then(response => {
        console.log(response.data);  // 데이터 확인
        setLocations(response.data); // 데이터가 성공적으로 들어오면 상태값 설정
        setLoading(false); // 로딩 완료
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
        setLoading(false); // 에러 발생 시 로딩 종료
      });
  }, []);

  // 데이터가 로드되기 전에 로딩 상태 표시
  if (loading) {
    return <p>Loading film locations...</p>;
  }

  return (
    <div>
      <h1>Film Locations</h1>
      <ul>
        {locations.map(location => (
          <li key={location.Count_Num}>
            순서 {location.Count_Num} <br/>
            종류 {location.media_type} <br/>
            {location.title_NM} - {location.place_Name}
            {location.addr}<br/>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilmLocationList;
