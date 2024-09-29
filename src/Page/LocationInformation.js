import React from 'react';
import { useParams } from 'react-router-dom'; // useParams 추가
import LocationInformationComponent from '../Component/LocationInformationComponent';
import CommentComponent from '../Component/CommentComponent';

const LocationInformation = () => {
  const { contentTitle, placeName } = useParams();  

  return (
    <div>
      {/* contentTitle을 ContentLocations 컴포넌트에 전달 */}
      <LocationInformationComponent contentTitle={contentTitle} placeName={placeName} />
      <CommentComponent contentTitle={contentTitle} placeName={placeName} />
    </div>
  );
};

export default LocationInformation;
