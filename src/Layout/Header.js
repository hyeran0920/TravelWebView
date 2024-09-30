import React from 'react';
import Search from '../Page/Search';
import Nav from '../Page/Nav';
import logo from '../img/LOGO1.png';

const Header = () => {
  return (
    <div>
    <div className="flex items-center justify-between p-4 bg-white">
      <div className="font-bold text-1xl">
        FIK!
      </div>
      <div className="flex items-center">
        <br/>
        <img
          src='https://cdn-icons-png.flaticon.com/512/7987/7987463.png'
          alt='위치 아이콘'
          className='w-3 mr-2'
        />
        <span className='text-2xs'>주문진, 강원도</span>
      </div>
    </div>
      <Search/>
      <Nav/>
    </div>
      );
}

export default Header;
