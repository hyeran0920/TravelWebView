import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import
// import SearchModal from '../Modal/SearchModal';

const Footer = () => {
  const [active, setActive] = useState('home');
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // 경로 이동을 위한 useNavigate 훅 사용

  const handleNavClick = (navItem) => {
    setActive(navItem);
    if (navItem === 'home') {
      navigate('/main'); // 'home' 버튼을 클릭하면 '/main' 경로로 이동
    };
  }

  return (
    <div>
      <div className="fixed bottom-0 left-0 right-0 flex justify-around p-4 bg-white shadow-md">
        {/* 홈버튼 */}
        <button
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center ${
            active === 'home' ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <i className="text-xl fas fa-home"></i>
          <span className="text-xs">Home</span>
        </button>
      </div>
    </div>
  );
};

export default Footer;




// import React, { useState } from 'react';

// const Footer = () => {
//   const [active, setActive] = useState('home');

//   const handleNavClick = (navItem) => {
//     setActive(navItem);
//   };

//   const navItems = [
//     { name: 'home', icon: 'home', label: 'Home' },
//     { name: 'search', icon: 'search', label: 'Search' },
//   ];

//   return (
//     <div className="fixed bottom-0 left-0 right-0 flex justify-around p-4 bg-white shadow-md">
//       {navItems.map((item) => (
//         <button
//           key={item.name}
//           onClick={() => handleNavClick(item.name)}
//           className={`flex flex-col items-center ${
//             active === item.name ? 'text-blue-600' : 'text-gray-400'
//           }`}
//         >
//           <i className={`fas fa-${item.icon} text-xl`}></i>
//           <span className="text-xs">{item.label}</span>
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Footer;
