import React from "react";
import { useParams } from "react-router-dom";
import LocationInformationComponent from "../Component/LocationInformationComponent";

const AddrInformation = () => {

  const {contentTitle, placeName} = useParams();

  return(
    <div>
      <LocationInformationComponent contentTitle={contentTitle} placeName={placeName} />
    </div>
  );
};

export default AddrInformation;