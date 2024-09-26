import React from 'react';
import { useNavigate } from 'react-router-dom';
import FamousContents from '../Component/FamousContents';
import MovieContents from '../Component/MovieContents';

const Movie = () => {
  return (
    <div>
      {/* <FamousContents/> */}
      <MovieContents/>
    </div>
  );
}

export default Movie;
