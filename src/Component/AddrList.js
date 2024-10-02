import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams 훅 추가

const AddrList = () => {
  const { locationName } = useParams();  // URL에서 locationName 파라미터 가져오기
  const [addrList, setAddrList] = useState([]); // 주소 목록 상태
  const [thumbnails, setThumbnails] = useState([]); // 썸네일 목록 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Axios 연동 : 주소의 이름 기준
    axios.get(`http://localhost:8080/content/searchByAddress?address=${locationName}`)
    .then(response => {
      setAddrList(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error("주소를 가져오는 중 에러 발생", error);
      setError("정보를 가져오는 중 오류가 발생했습니다.");
      setLoading(false);
    });
  
    // 썸네일 데이터 가져오기
    axios.get('http://localhost:8080/thumbnails/all')
    .then(response => {
      setThumbnails(response.data);
    })
    .catch(error => {
      console.error("썸네일 데이터 가져오는 중 에러 발생!", error);
    });
  }, [locationName]);

  if (loading) {
    return <p>Loading filming locations...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (addrList.length === 0) {
    return <p>No filming locations available for {locationName}.</p>;
  }

  const findThumbnail = (title_NM) => {
    const matchedThumbnail = thumbnails.find(thumbnail => thumbnail.title_nm === title_NM); // title_nm과 title_NM 비교
    if (matchedThumbnail) {
      const imageName = matchedThumbnail.image_Name;
      return imageName.includes('.') ? imageName : `${imageName}.jpg`;  // 확장자가 없으면 .jpg 추가
    }
    return null;
  };  

  const handleAddrClick = (contentTitle, placeName) => {
    navigate(`/InformationByAddr/${contentTitle}/${placeName}`);
  };
  

  return (
    <div className="p-5 mb-10">
      <h2 className="mb-5 text-2xl font-bold"> #{locationName} </h2>
      <div className="grid grid-cols-1 gap-6">
        {addrList.map((address, index) => {
          return (
            <div
              key={index}
              onClick={() => handleAddrClick(address.title_NM, address.place_Name)} // title_NM과 place_Name 사용
              className="relative flex flex-col justify-between h-40 p-5 overflow-hidden rounded-lg shadow-md"
            >
              {/* 썸네일 이미지가 있으면 출력 */}
              {findThumbnail(address.title_NM) && (  // title_NM 사용
                <img
                  src={`http://localhost:8080/thumbnails/images/${findThumbnail(address.title_NM)}`} // title_NM 사용
                  alt={`${address.title_NM} thumbnail`} // alt 값도 title_NM으로 변경
                  className="absolute inset-0 object-cover object-top w-full h-full rounded-lg"
                />
              )}
              <div className="absolute bottom-0 left-0 w-full p-5 text-lg font-bold text-left text-white">
              {address.title_NM} 
                <p className="mt-1 text-sm text-gray-200">{address.place_Name}</p> 
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddrList;