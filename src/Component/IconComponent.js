import React from 'react';

const IconComponent = ({ handleSvgClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      onClick={handleSvgClick} // 클릭 이벤트
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
};

export default IconComponent;
