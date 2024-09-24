import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가

const MovieContents = () => {
  const [movieList, setMovieList] = useState([]);  // 영화 제목 목록을 저장할 상태
  const [loading, setLoading] = useState(true);    // 로딩 상태 관리
  const [error, setError] = useState(null);        // 에러 상태 추가
  const navigate = useNavigate();  // useNavigate 사용

  useEffect(() => {
    setLoading(true);
    
    // Axios 요청
    axios.get('http://localhost:8080/content/getAllMovies')
      .then(response => {
        setMovieList(response.data); // 응답 데이터를 상태로 설정 (문자열 리스트)
        setLoading(false);           // 로딩 완료
      })
      .catch(error => {
        console.error("데이터 가져오는 중 에러 발생!", error);
        setError("데이터를 가져오는 중 오류가 발생했습니다."); // 에러 메시지 설정
        setLoading(false);  // 에러 발생 시 로딩 종료
      });
  }, []);

  // 로딩 중일 때 표시
  if (loading) {
    return <p>Loading movie titles...</p>;
  }

  // 에러 발생 시 표시
  if (error) {
    return <p>{error}</p>;
  }

  // 데이터가 없을 경우 처리
  if (movieList.length === 0) {
    return <p>No movie titles available.</p>;
  }

  // 영화 박스를 클릭하면 해당 영화를 선택하고 페이지로 이동
  const handleMovieClick = (contentTitle) => {
    navigate(`/contentLocationList/${contentTitle}`); // 영화 제목으로 URL 이동
  };

  return (
    <div>
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-5">영화 목록</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">  
          {movieList.map((title, index) => (
            <div
              key={index}
              onClick={() => handleMovieClick(title)} // 클릭 시 페이지 이동
              className="bg-gray-400 rounded-lg h-40 flex items-end p-5 text-black font-bold transform transition-transform duration-300 hover:scale-105 active:scale-95 active:bg-gray-100 cursor-pointer"
            >
              <div>
                <div className="text-left">{title}</div>
                <div className="text-sm font-normal mt-1">영화</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieContents;
