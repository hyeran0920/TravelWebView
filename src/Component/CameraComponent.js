import React, { useRef, useEffect, useState } from 'react';
import { FaCamera, FaCog, FaSyncAlt, FaImages, FaBolt, FaClock, FaLongArrowAltLeft } from "react-icons/fa";
import axios from 'axios';
import CameraModal from '../Modal/CameraModal';
import { useLocation, useNavigate } from 'react-router-dom';

const CameraComponent = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null); 
  const location = useLocation();
  const navigate = useNavigate();
  const { layerImage } = location.state;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flashEffect, setFlashEffect] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // 줌 레벨 상태 관리
  const [track, setTrack] = useState(null); // 현재 트랙 상태 관리

  useEffect(() => {
    let localStream;

    navigator.mediaDevices.getUserMedia({ video: { zoom: true } }) // 카메라 줌 지원 확인
      .then(stream => {
        localStream = stream;
        const videoTrack = stream.getVideoTracks()[0];
        setTrack(videoTrack); // 트랙 저장

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(error => {
        console.error("카메라 접근 중 에러 발생!", error);
      });

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      setFlashEffect(true);
      setTimeout(() => setFlashEffect(false), 200);

      canvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append('file', blob, 'captured_image.png');

        axios.post('http://localhost:8080/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log("이미지 업로드 성공", response.data);
          setIsModalOpen(true);
        })
        .catch(error => {
          console.error("이미지 업로드 실패", error);
        });
      }, 'image/png');
    }
  };

  const handleZoomChange = (zoomValue) => {
    if (track) {
      const capabilities = track.getCapabilities();
      if (capabilities.zoom) {
        track.applyConstraints({ advanced: [{ zoom: zoomValue }] })
          .then(() => {
            setZoomLevel(zoomValue); // 줌 레벨 업데이트
          })
          .catch(error => {
            console.error("줌 조정 실패", error);
          });
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full h-screen bg-black">
      {/* 비디오 프리뷰 */}
      <video ref={videoRef} autoPlay className="absolute top-0 left-0 z-10 object-cover w-full h-full" />
      {layerImage && (
        <img src={layerImage} alt="Layer" className="absolute top-0 left-0 z-20 object-contain w-full h-full opacity-50" />
      )}
      <canvas ref={canvasRef} className="hidden"></canvas>

      {/* 플래시 효과 */}
      {flashEffect && (
        <div className="absolute top-0 left-0 z-40 w-full h-full bg-white opacity-75"></div>
      )}

      {/* 상단바 */}
      <div className="absolute top-0 z-30 flex justify-between w-full px-4 py-2 text-white bg-black">
        <FaCog size={24} />
        <div className="flex space-x-4">
          <FaBolt size={24} />
          <FaClock size={24} />
          <span>3:4</span>
          <span>12M</span>
          <FaSyncAlt size={24} />
        </div>
      </div>

      {/* 줌 버튼 */}
      <div className="absolute z-30 flex items-center justify-center w-full text-white bottom-32">
        <button 
          onClick={() => handleZoomChange(0.5)}
          className={`px-4 py-2 bg-gray-800 rounded-full ${zoomLevel === 0.5 ? 'bg-gray-600' : ''}`}
        >.5</button>
        <button 
          onClick={() => handleZoomChange(1)}
          className={`px-4 py-2 mx-4 bg-gray-800 rounded-full ${zoomLevel === 1 ? 'bg-gray-600' : ''}`}
        >1x</button>
        <button 
          onClick={() => handleZoomChange(2)}
          className={`px-4 py-2 bg-gray-800 rounded-full ${zoomLevel === 2 ? 'bg-gray-600' : ''}`}
        >2</button>
      </div>

      {/* 하단바 */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 text-white bg-black">
        <FaImages size={36} />
        
        <button 
          onClick={handleCapture}
          className="p-4 text-white bg-white rounded-full"
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
          }}
        >
          <FaCamera size={40} color="black" />
        </button>

        <button 
          onClick={() => navigate(-1)} 
          className="p-4 bg-white rounded-full">
          <FaLongArrowAltLeft size={20} color='black' />
        </button>
      </div>

      {/* 모달 컴포넌트 */}
      <CameraModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default CameraComponent;