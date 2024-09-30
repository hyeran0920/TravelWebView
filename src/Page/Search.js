import React from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 이벤트 막기
    const searchInput = e.target.elements.search.value.trim(); // 검색어 가져오기
    if (searchInput) {
      // 검색어가 있을 경우에만 이동
      navigate(`/content/searchList?query=${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-md pl-2 pr-2">
        <form onSubmit={handleSubmit} role='search'>
          <input
            type="text"
            name="search" // 검색어 input name 설정
            placeholder="검색어를 입력해주세요"
            className="w-full h-8 p-4 pl-12 border rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <img 
              className="pl-3 text-gray-400 w-7" 
              src="https://cdn-icons-png.flaticon.com/512/2989/2989907.png" 
              alt="Search Icon" 
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;