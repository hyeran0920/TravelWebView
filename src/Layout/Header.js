import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import Nav from '../Page/Nav';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색창 표시 여부 상태
  const [searchInput, setSearchInput] = useState(''); // 검색어 상태

  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen); // 검색창 열기/닫기 토글
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 이벤트 막기
    if (searchInput.trim()) {
      // 검색어가 있을 경우에만 이동
      navigate(`/content/searchList?query=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      // 검색 로직 추가 (여기서 검색 작업을 수행할 수 있습니다.)
      console.log('검색어:', searchInput);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-white">
        <div className="font-bold text-1xl">FIK!</div>
        <div className="flex items-center">
          <img
            src='https://cdn-icons-png.flaticon.com/512/2989/2989907.png'
            alt='검색 아이콘'
            className='w-5 ml-px mr-2 cursor-pointer' // 1px 간격을 추가한 상태로 유지
            onClick={toggleSearch} // 아이콘 클릭 시 toggleSearch 함수 실행
          />
        </div>
      </div>

      {/* 검색창이 열렸을 때만 표시 */}
      {isSearchOpen && (
        <div className="flex items-center p-4">
          <form onSubmit={handleSubmit} role="search" className="flex items-center w-full">
            <input
              type="text"
              name="search" // name 속성 추가
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)} // 검색어 상태 업데이트
              placeholder="검색어를 입력하세요"
              className="flex-grow h-8 p-4 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              type="submit" // 버튼의 타입을 submit으로 지정
              className="flex items-center justify-center px-3 py-2 ml-2 text-white bg-blue-500 rounded"
            >
              <FaSearch size={17} />
              {/* <img
                src='https://cdn-icons-png.flaticon.com/512/2989/2989907.png'
                alt='검색 아이콘'
                className='w-5 ml-1 mr-2 cursor-pointer'
              /> */}
            </button>
          </form>
        </div>
      )}

      <Nav />
    </div>
  );
}

export default Header;