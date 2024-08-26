import React, { useState, useEffect } from 'react';

const destinations = [
  { name: '1', color: 'red' },
  { name: '2', color: 'orange' },
  { name: '3', color: 'yellow' },
  { name: '4', color: 'green' },
  { name: '5', color: 'blue' },
  { name: '6', color: 'indigo' },
  { name: '7', color: 'violet' },
];

const FamousContents = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSubIndex, setSelectedSubIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setSelectedSubIndex((prevSubIndex) => {
          if (prevSubIndex === 2) {
            setSelectedIndex((prevIndex) => (prevIndex + 3) % destinations.length);
            return 0;
          }
          return prevSubIndex + 1;
        });
      }, 3000); // 각 슬라이드가 3초마다 순서대로 커짐

      return () => clearInterval(interval); // 클린업 함수
    }
  }, [autoPlay]);

  const handleNext = () => {
    setSelectedSubIndex(0);
    setSelectedIndex((prevIndex) => (prevIndex + 3) % destinations.length);
    setAutoPlay(false);
  };

  const handlePrev = () => {
    setSelectedSubIndex(0);
    setSelectedIndex((prevIndex) => (prevIndex - 3 + destinations.length) % destinations.length);
    setAutoPlay(false);
  };

  const renderSlides = () => {
    const startIndex = selectedIndex;
    const slidesToShow = destinations.slice(startIndex, startIndex + 3).concat(
      destinations.slice(0, Math.max(0, (startIndex + 3) - destinations.length))
    );

    return slidesToShow.map((dest, index) => {
      const isSelected = selectedSubIndex === index;
      return (
        <div
          key={index}
          onClick={() => setSelectedSubIndex(index)}
          style={{
            flex: isSelected ? '3' : '1',
            height: '200px',
            backgroundColor: dest.color,
            cursor: 'pointer',
            transition: 'flex 1.5s ease, transform 1.5s ease', // 전환 시간을 1.5초로 설정
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            color: 'white',
            transform: isSelected ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          {dest.name}
        </div>
      );
    });
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px',textAlign:'left' }}>인기 여행지</h2>
      <div style={{ display: 'flex', overflow: 'hidden', width: '100%', maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
        <button 
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: '2px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'transparent',
            border: 'none',
            color:'#fff',
            fontSize: '24px',
            cursor: 'pointer',
            zIndex: 1,
          }}
        >
          &#9664;
        </button>
        {renderSlides()}
        <button 
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: '2px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '24px',
            color:'#fff',
            cursor: 'pointer',
            zIndex: 1,
          }}
        >
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default FamousContents;
