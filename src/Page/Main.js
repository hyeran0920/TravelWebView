import React from 'react';
import { useNavigate } from 'react-router-dom';
import FamousTravel from '../Component/FamousTravel';
import RecomTravel from '../Component/RecomTravel';

const Main = () => {


  return (
    <div>
        <FamousTravel/>
        <RecomTravel/>
        {/* <FilmLocationListTest/> */}
    </div>
  );
}

export default Main;
