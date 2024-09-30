import React, { useState } from 'react';
import Nav from '../Page/Nav';
import { useNavigate } from 'react-router-dom';
import IconComponent from '../Component/IconComponent';

const Header = () => {
  const [searchInput, setSearchInput] = useState(''); // 검색어 상태
  const [isFocused, setIsFocused] = useState(false); // 포커스 여부 상태

  const navigate = useNavigate();

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
      <div className="relative flex items-center justify-between p-4 bg-white">
        <div className="font-bold text-1xl">FIK!</div>
        <div className="flex items-center">
          <div className="relative max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="relative mx-auto w-max">
              <input 
                type="search" 
                placeholder={isFocused ? "검색어를 입력하세요" : ""} // 포커스 상태일 때만 placeholder 표시
                className="relative z-10 w-12 h-12 pl-4 pr-12 bg-transparent border rounded-full outline-none cursor-pointer peer focus:w-full focus:cursor-text focus:border-blue-600 focus:pl-4 focus:pr-16"
                value={searchInput}
                onFocus={() => setIsFocused(true)} // 포커스되면 placeholder 표시
                onBlur={() => setIsFocused(false)}  // 포커스 해제 시 placeholder 숨김
                onChange={(e) => setSearchInput(e.target.value)} // 입력한 검색어를 상태로 저장
              />
              <div className="absolute inset-y-0 right-0 z-20 flex items-center pr-2">
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

// import React, { useState } from 'react';
// import Nav from '../Page/Nav';
// import { useNavigate } from 'react-router-dom';
// import IconComponent from '../Component/IconComponent';

// const Header = () => {
//   const [searchInput, setSearchInput] = useState(''); // 검색어 상태
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault(); // 기본 폼 제출 이벤트 막기
//     handleSvgClick(); // 폼 제출 시에도 검색 실행
//   };

//   const handleSvgClick = () => {
//     console.log("SVG clicked!"); // 클릭 이벤트가 발생했는지 확인
//     if (searchInput.trim()) {
//       // 검색어가 있을 경우에만 이동
//       navigate(`/content/searchList?query=${encodeURIComponent(searchInput.trim())}`);
//     }
//   };

//   return (
//     <div>
//       <div className="relative flex items-center justify-between p-4 bg-white">
//         <div className="font-bold text-1xl">FIK!</div>
//         <div className="flex items-center">
//           <div className="relative max-w-md mx-auto">
//             <form onSubmit={handleSubmit} className="relative mx-auto w-max">
//               <input 
//                 type="search" 
//                 placeholder="검색어를 입력하세요"
//                 className="relative z-10 w-48 h-12 pl-4 pr-12 bg-transparent border rounded-full outline-none cursor-pointer peer focus:w-full focus:cursor-text focus:border-blue-600 focus:pl-4 focus:pr-16"
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)} // 입력한 검색어를 상태로 저장
//               />
//               <div className="absolute inset-y-0 right-0 z-20 flex items-center pr-2">
//                 {/* 아이콘을 클릭할 때 handleSvgClick 호출 */}
//                 <IconComponent handleSvgClick={handleSvgClick} />
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       <Nav />
//     </div>
//   );
// };

// export default Header;
