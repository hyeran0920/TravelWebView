import React from 'react';
import { useNavigate } from 'react-router-dom';
import FoodIcon from '../Component/FoodIcon';
import FoodRecom from '../Component/FoodRecom';


const Food = () => {

  return (
    <div>
        <FoodIcon/>
        <FoodRecom/>
        
    </div>
  );
}

export default Food;
