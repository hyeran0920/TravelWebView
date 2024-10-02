import React, { useEffect, useState } from 'react'; 
import { useLocation } from 'react-router-dom'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const SearchListComponent = () => {
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태 저장
  const [thumbnails, setThumbnails] = useState([]); // 썸네일 상태 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(''); // 에러 메시지 상태 관리
  const navigate = useNavigate(); // 경로 이동을 위한 네비게이션 훅

  const location = useLocation(); // 현재 URL 경로의 정보를 가져옴
  const searchParams = new URLSearchParams(location.search); // URL의 쿼리 파라미터를 파싱
  const query = searchParams.get('query') || ''; // URL의 query 파라미터를 가져와 검색어로 설정

  // 컴포넌트가 렌더링될 때 또는 query가 변경될 때 실행되는 useEffect
  useEffect(() => {
    // 검색 결과를 서버로부터 가져오는 함수
    const searchResults = async () => {
      try {
        const response = await axios.get(`/content/searchList?query=${query}`); // 서버로 query 파라미터를 포함하여 요청
        setSearchResults(response.data); // 검색 결과를 상태에 저장
      } catch (err) {
        console.error(err); // 에러가 발생하면 콘솔에 출력
        setError('검색 결과를 가져오는 데 실패했습니다.'); // 에러 메시지를 상태로 설정
      }
    };
  
    // 썸네일 데이터를 서버로부터 가져오는 함수
    const fetchThumbnails = async () => {
      try {
        const response = await axios.get('http://localhost:8080/thumbnails/all'); // 썸네일 데이터를 서버로부터 요청
        setThumbnails(response.data); // 썸네일 데이터를 상태에 저장
      } catch (err) {
        console.error('썸네일 데이터를 가져오는 데 실패했습니다.', err); // 에러 발생 시 콘솔에 출력
      }
    };
  
    // 검색어가 있을 경우에만 데이터를 가져옴
    if (query) {
      searchResults(); // 검색 결과 요청
      fetchThumbnails(); // 썸네일 요청
    } else {
      setError('검색어가 제공되지 않았습니다.'); // 검색어가 없는 경우 에러 메시지 설정
    }
  
    setLoading(false); // 데이터 로딩이 완료되면 로딩 상태를 false로 변경
  }, [query]); // query가 변경될 때마다 이 useEffect가 실행됨
  

  // 제목과 미디어 타입을 기준으로 썸네일을 찾는 함수
  const findThumbnail = (title, mediaType) => {
    const matchedThumbnail = thumbnails.find(
      (thumbnail) => thumbnail.title_nm === title && thumbnail.media_type === mediaType // 제목과 미디어 타입이 일치하는 썸네일 찾기
    );
    if (matchedThumbnail) {
      const imageName = matchedThumbnail.image_Name;
      return imageName.includes('.') ? imageName : `${imageName}.jpg`;  // 이미지 확장자가 없으면 .jpg 추가
    }
    return null; // 썸네일이 없는 경우 null 반환
  };

  // 로딩 중일 때 로딩 메시지를 표시
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 에러가 발생했을 경우 에러 메시지를 표시
  if (error) {
    return <div>{error}</div>;
  }

  // 콘텐츠 클릭 시 상세 정보 페이지로 이동하는 함수
  const handleContentsClick = (contentTitle, placeName) => {
    navigate(`/InformationByPlace/${contentTitle}/${placeName}`); // contentTitle과 placeName을 포함해 새로운 경로로 이동
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
                onClick={()=> handleContentsClick(result.title_NM, result.place_Name)} // 콘텐츠를 클릭하면 상세 정보 페이지로 이동
                className="relative flex items-end h-48 p-5 font-bold text-black transition-transform duration-300 transform bg-gray-400 rounded-lg cursor-pointer "
              >
                {/* 썸네일 이미지가 있으면 출력 */}
                {findThumbnail(result.title_NM, result.media_type) && (
                  <img
                    src={`http://localhost:8080/thumbnails/images/${findThumbnail(result.title_NM, result.media_type)}`} // 썸네일 이미지의 경로 설정
                    alt={`${result.title_NM} thumbnail`} // 이미지 설명 설정
                    className="absolute inset-0 object-cover object-top w-full h-full rounded-lg" // 이미지를 적절한 크기와 위치에 배치
                  />
                )}
                <div className="relative z-10 top-2">
                <div className="text-left text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
  {result.title_NM}
</div> {/* 제목 출력 */}
<div className="text-left text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
  {result.place_Name}
</div> {/* 촬영지 출력 */}
<div className="text-left text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
  {result.addr}
</div> {/* 주소 출력 */}

                </div>
              </div>
            ))
          ) : (
            <div>검색 결과가 없습니다.</div> // 검색 결과가 없을 때 메시지 출력
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchListComponent;
