import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchListComponent = () => {
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
  const [thumbnails, setThumbnails] = useState([]); // 썸네일 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(''); // 에러 상태
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // query 파라미터로 검색어 가져오기
  const query = searchParams.get('query') || '';

  useEffect(() => {
    const searchResults = async () => {
      try {
        const response = await axios.get(`/content/searchList?query=${query}`); // query 파라미터로 요청
        setSearchResults(response.data); // 검색 결과를 상태에 저장
      } catch (err) {
        console.error(err);
        setError('검색 결과를 가져오는 데 실패했습니다.');
      }
    };
  
    const fetchThumbnails = async () => {
      try {
        const response = await axios.get('http://localhost:8080/thumbnails/all');
        setThumbnails(response.data); // 썸네일 데이터 상태에 저장
      } catch (err) {
        console.error('썸네일 데이터를 가져오는 데 실패했습니다.', err);
      }
    };
  
    if (query) {
      searchResults();
      fetchThumbnails();
    } else {
      setError('검색어가 제공되지 않았습니다.');
    }
  
    setLoading(false);
  }, [query]);
  

  // 제목과 미디어 타입을 기준으로 썸네일을 찾는 함수
  const findThumbnail = (title, mediaType) => {
    const matchedThumbnail = thumbnails.find(
      (thumbnail) => thumbnail.title_nm === title && thumbnail.media_type === mediaType
    );
    if (matchedThumbnail) {
      const imageName = matchedThumbnail.image_Name;
      return imageName.includes('.') ? imageName : `${imageName}.jpg`;  // 확장자가 없으면 .jpg 추가
    }
    return null;
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleContentsClick = (contentTitle, placeName) => {
    // contentTitle과 placeName을 함께 넘겨 경로로 이동
    navigate(`/InformationByPlace/${contentTitle}/${placeName}`);
  };
  

  return (
    <div>
      <div className="p-5">
        <h2 className="mb-5 text-2xl font-bold">검색 결과</h2>
        <div className="grid grid-cols-1 gap-6 mb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <div
                key={index}
                onClick={()=> handleContentsClick(result.title_NM, result.place_Name)}
                className="relative flex items-end h-48 p-5 font-bold text-black transition-transform duration-300 transform bg-gray-400 rounded-lg cursor-pointer "
              >
                {/* 썸네일 이미지가 있으면 출력 */}
                {findThumbnail(result.title_NM, result.media_type) && (
                  <img
                    src={`http://localhost:8080/thumbnails/images/${findThumbnail(result.title_NM, result.media_type)}`}
                    alt={`${result.title_NM} thumbnail`}
                    className="absolute inset-0 object-cover object-top w-full h-full rounded-lg"
                  />
                )}
                <div className="relative z-10 top-2">
                  <div className="text-left text-white shadow-lg">{result.title_NM}</div>
                  <div className="text-left text-white shadow-sm">촬영지: {result.place_Name}</div>
                  <div className="text-left text-white shadow-sm">주소: {result.addr}</div>
                </div>
              </div>
            ))
          ) : (
            <div>검색 결과가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchListComponent;
