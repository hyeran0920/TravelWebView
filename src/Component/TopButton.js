import React, { useState, useEffect } from 'react';

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 이벤트 핸들러
  const toggleVisibility = () => {
    console.log(window.scrollY);  // 현재 스크롤 위치 출력
    if (window.scrollY > 50) {  // 스크롤이 50px 이상 내려가면 버튼 표시
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 상단으로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 부드럽게 스크롤
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-red-500 text-white py-5 px-8 rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
          style={{ zIndex: 99999, border: '5px solid green', fontSize: '24px' }}  // z-index와 강제로 표시하는 스타일 추가
        >
          Top
        </button>
      )}
    </div>
  );
};

export default TopButton;
