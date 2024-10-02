import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';  // react-icons에서 화살표 아이콘 임포트

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollableElement = document.querySelector('.content');  // .content 요소 선택

    const toggleVisibility = () => {
      if (scrollableElement.scrollTop > 350) {  // 스크롤이 350px 이상일 때 버튼 표시
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    scrollableElement.addEventListener('scroll', toggleVisibility);  // 스크롤 이벤트 리스너 추가

    return () => {
      scrollableElement.removeEventListener('scroll', toggleVisibility);  // 이벤트 리스너 제거
    };
  }, []);

  const scrollToTop = () => {
    const scrollableElement = document.querySelector('.content');
    scrollableElement.scrollTo({
      top: 0,
      behavior: 'smooth',  // 부드럽게 스크롤
    });
  };

  return (
    <div className="top-button">
      {isVisible && (
        <button onClick={scrollToTop} style={buttonStyle}>
          <FaArrowUp /> {/* 화살표 아이콘 표시 */}
        </button>
      )}
    </div>
  );
};

const buttonStyle = {
  position: 'fixed',
  bottom: '60px',
  right: '20px',
  backgroundColor: 'white',
  color: '#79353e',
  border: 'none',
  padding: '7px',
  borderRadius: '30px',
  cursor: 'pointer',
  fontSize: '17px',  // 화살표 크기 조정
  zIndex: '9999',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',  // 그림자 추가
};

export default TopButton;
