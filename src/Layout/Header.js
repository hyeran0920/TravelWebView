import React from 'react';
import Search from '../Page/Search';
import Nav from '../Page/Nav';

const Header = () => {
  return (
    <div>
    <div className="flex justify-between items-center p-4 bg-white">
      <div className="text-1xl font-bold">
        여행작旅行作
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
