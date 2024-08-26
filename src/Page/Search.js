import React from 'react';

const Search = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full max-w-md pl-2 pr-2">
        <input
          type="text"
          placeholder="Find things to do"
          className="w-full h-8 p-4 pl-12 border rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <img 
            className="w-7 text-gray-400 pl-3" 
            src="https://cdn-icons-png.flaticon.com/512/2989/2989907.png" 
            alt="Search Icon" 
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
