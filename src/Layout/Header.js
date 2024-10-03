import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; // 돋보기 아이콘 라이브러리 추가

const Header = () => {
  const [searchInput, setSearchInput] = useState(''); // 검색어 상태
  const [isFocused, setIsFocused] = useState(false); // 포커스 여부 상태
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 이벤트 막기
    handleSvgClick(); // 폼 제출 시 검색 실행
  };

  const handleSvgClick = () => {
    if (searchInput.trim()) {
      // 검색어가 있을 경우에만 이동
      navigate(`/content/searchList?query=${encodeURIComponent(searchInput.trim())}`);
    }
  };
  const handleBlur = () => {
    // 입력 필드에서 포커스 해제 시 동작
    if (!searchInput.trim()) {
      setIsFocused(false); // 검색어가 없으면 다시 축소
    }
  };

  return (
    <div className='bg-white mt-20'>
      <style>
        {`
@font-face {
    font-family: 'LeferiPoint-BlackObliqueA';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/LeferiPoint-BlackObliqueA.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
        `}
      </style>
      {/* 상단 고정된 헤더 */}
      <div className="fixed top-7 left-0 right-0 z-50 flex justify-between items-center px-4 py-2  bg-white">
        {/* Fik! 로고 */}
        <button
  onClick={() => navigate('/main')}
  style={{
    fontFamily: 'LeferiPoint-BlackObliqueA',
    fontSize: '24px',
    color: '#79353E',
    textShadow: '5px 3px 3px rgba(1, 1, 1, 0.2)' // 글자에 그림자 적용
  }}
>
  Film In Korea
</button>


        {/* 돋보기 검색 */}
        <div className="flex items-center">
          <form onSubmit={handleSubmit} className="relative">
            <input 
              type="search" 
              placeholder="검색하기" // 검색 시 placeholder 표시
              className={`relative z-10 h-10 pl-4 pr-120 rounded-full outline-none transition-all duration-300 ease-in-out ${isFocused ? 'w-64 bg-white' : 'w-0 bg-transparent'}`} 
              value={searchInput}
              onFocus={() => setIsFocused(true)} // 포커스되면 확장
              onBlur={handleBlur}  // 포커스 해제 시 동작
              onChange={(e) => setSearchInput(e.target.value)} // 입력한 검색어를 상태로 저장
            />

            {/* 돋보기 아이콘 */}
            <button type="button" onClick={handleSvgClick} className="absolute inset-y-0 right-2 flex items-center text-black">
            <FaSearch size={20} style={{ filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))' }} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
