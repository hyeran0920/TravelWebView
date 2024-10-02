import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MovieContents = () => {
const [movieList, setMovieList] = useState([]);  // 영화 제목 목록 상태
const [thumbnails, setThumbnails] = useState([]); // 썸네일 목록 상태
const [loading, setLoading] = useState(true);    // 로딩 상태
const [error, setError] = useState(null);        // 에러 상태
const navigate = useNavigate();                  // 페이지 이동을 위한 useNavigate

useEffect(() => {
  // 영화 제목 데이터 가져오기
  axios.get('http://localhost:8080/content/getAllMovies')
    .then(response => {
      setMovieList(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error("데이터 가져오는 중 에러 발생!", error);
      setError("데이터를 가져오는 중 오류가 발생했습니다.");
      setLoading(false);
    });

  // 썸네일 데이터 가져오기
  axios.get('http://localhost:8080/thumbnails/all')
    .then(response => {
      setThumbnails(response.data);
      // console.log("썸네일 데이터: ", response.data);
    })
    .catch(error => {
      console.error("썸네일 데이터 가져오는 중 에러 발생!", error);
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

// 영화 박스를 클릭하면 해당 영화를 선택하고 페이지로 이동
const handleMovieClick = (contentTitle) => {
  navigate(`/contentLocationList/${contentTitle}`); // 영화 제목으로 URL 이동
};

return (
  <div>
    <div className="p-5">
      <br/>
    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px',marginTop: '25px', textAlign: 'left' }}>영화 목록</h2>
    <div className="grid grid-cols-1 gap-6 mb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movieList.map((title, index) => (
          <div
            key={index}
            onClick={() => handleMovieClick(title)} // 클릭 시 페이지 이동
            className="relative flex items-end h-48 p-5 font-bold text-black transition-transform duration-300 transform bg-gray-400 rounded-lg cursor-pointer hover:scale-105 active:scale-95 active:bg-gray-100"
          >
            {/* 썸네일 이미지가 있으면 출력 */}
            {findThumbnail(title) && (
              <img
                src={`http://localhost:8080/thumbnails/images/${findThumbnail(title)}`} // 확장자를 포함한 이미지 URL
                alt={`${title} thumbnail`}
                className="absolute inset-0 object-cover object-top w-full h-full rounded-lg" // object-top 추가해서 사진 윗쪽이 좀 더 잘보이게
              />
            )}
            <div className="relative z-10 top-2">
            <div className="text-left text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
  {title}
</div>
              {/* <div className="mt-1 text-sm font-normal text-white shadow-sm">영화</div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default MovieContents;