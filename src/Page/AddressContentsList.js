import React from "react";
import { useParams } from "react-router-dom";
import AddrList from "../Component/AddrList";

const AddressContentsList = () => {

  const { locationName } = useParams();

  return(
    <div className="p-5">
      <AddrList locationName={locationName} />
    </div>
  )
}

export default AddressContentsList;