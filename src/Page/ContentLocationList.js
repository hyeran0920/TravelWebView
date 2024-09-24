import React from 'react';
import { useParams } from 'react-router-dom'; // useParams 추가
import ContentLocations from '../Component/ContentLocations'; // ContentLocations 컴포넌트 임포트

const ContentLocationList = () => {
  const { contentTitle } = useParams();  // URL 파라미터에서 영화 제목 읽기

  return (
    <div className="p-5">
      {/* contentTitle을 ContentLocations 컴포넌트에 전달 */}
      <ContentLocations contentTitle={contentTitle} />
    </div>
  );
};

export default ContentLocationList;
