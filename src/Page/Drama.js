import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecomContents from '../Component/RecomContents';
import FamousContents from '../Component/FamousContents';
import DramaContents from '../Component/DramaContents';

const Drama = () => {
  return (
    <div>
      <DramaContents/>
    </div>
  );
}

export default Drama;
