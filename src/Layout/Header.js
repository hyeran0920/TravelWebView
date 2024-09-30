import React, { useState } from 'react';
import Nav from '../Page/Nav';
import { useNavigate } from 'react-router-dom';
import IconComponent from '../Component/IconComponent'; // IconComponent에서 path 아이콘을 사용

const Header = () => {
  const [searchInput, setSearchInput] = useState(''); // 검색어 상태
  const [isFocused, setIsFocused] = useState(false); // 포커스 여부 상태
  const navigate = useNavigate();
  
  const handleNavClick = () => {
    navigate('/main'); // 버튼 클릭 시 '/main' 경로로 이동
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 이벤트 막기
    handleSvgClick(); // 폼 제출 시에도 검색 실행
  };

  const handleSvgClick = () => {
    if (searchInput.trim()) {
      // 검색어가 있을 경우에만 이동
      navigate(`/content/searchList?query=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div>
      <style>
        {`
          @font-face {
            font-family: 'SF_HambakSnow';
            src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/SF_HambakSnow.woff') format('woff');
            font-weight: normal;
            font-style: normal;
          }
        `}
      </style>
      <div className="relative flex items-center justify-between pt-2 pl-4 bg-white">
        {/* 버튼 클릭 시 메인 페이지로 이동 */}
        <button
          onClick={handleNavClick}
          className=""
          style={{ fontFamily: 'SF_HambakSnow', fontSize: '24px' }}  // 폰트 적용
        >
          Fik!
        </button>
        
        <div className="flex items-center">
          <div className="relative max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="relative mx-auto w-max">
              <input 
                type="search" 
                placeholder={isFocused ? "검색어를 입력하세요" : ""} // 포커스 상태일 때만 placeholder 표시
                className="relative z-10 w-16 h-8 pl-4 pr-10 bg-transparent border border-transparent rounded-full outline-none cursor-pointer peer transition-all duration-300 ease-in-out focus:w-full focus:cursor-text focus:border-gray-300 focus:pl-4 focus:pr-16 focus:text-sm" 
                value={searchInput}
                onFocus={() => setIsFocused(true)} // 포커스되면 placeholder 표시
                onBlur={() => setIsFocused(false)}  // 포커스 해제 시 placeholder 숨김
                onChange={(e) => setSearchInput(e.target.value)} // 입력한 검색어를 상태로 저장
              />

              <div className="absolute inset-y-0 right-0 z-20 flex items-center pr-3">
                {/* 아이콘을 클릭할 때 handleSvgClick 호출 */}
                <IconComponent handleSvgClick={handleSvgClick} />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Nav />
    </div>
  );
};

export default Header;
