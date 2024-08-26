import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecomContents from '../Component/RecomContents';
import FamousContents from '../Component/FamousContents';

const Contents = () => {
  return (
    <div>
      <FamousContents/>
      <RecomContents/>
    </div>
  );
}

export default Contents;
