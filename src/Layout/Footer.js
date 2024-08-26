import React, { useState } from 'react';

const Footer = () => {
  const [active, setActive] = useState('home');

  const handleNavClick = (navItem) => {
    setActive(navItem);
  };

  const navItems = [
    { name: 'home', icon: 'home', label: 'Home' },
    { name: 'ticket', icon: 'ticket', label: 'Ticket' },
    { name: 'heart', icon: 'heart', label: 'Heart' },
    { name: 'user', icon: 'user', label: 'User' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 flex justify-around">
      {navItems.map((item) => (
        <button
          key={item.name}
          onClick={() => handleNavClick(item.name)}
          className={`flex flex-col items-center ${
            active === item.name ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <i className={`fas fa-${item.icon} text-xl`}></i>
          <span className="text-xs">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Footer;
