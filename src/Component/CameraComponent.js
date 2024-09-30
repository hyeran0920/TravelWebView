import React, { useRef, useEffect, useState } from 'react';
import { FaCamera, FaCog, FaSyncAlt, FaImages, FaBolt, FaClock, FaLongArrowAltLeft } from "react-icons/fa";
import axios from 'axios'; 
import CameraModal from '../Modal/CameraModal'; 
import { useLocation, useNavigate } from 'react-router-dom';

const CameraComponent = () => {
  // 비디오와 캔버스(캡쳐)를 참조하는 ref 설정
  const videoRef = useRef(null);
  const canvasRef = useRef(null); 
  const location = useLocation(); // 현재 경로의 상태를 받아옴
  const navigate = useNavigate(); // 페이지 이동을 관리하는 훅
  const { layerImage } = location.state; // 경로에서 전달된 상태값 중 layerImage 추출

  // 모달 상태, 플래시 효과 상태, 줌 레벨, 트랙 상태를 관리하는 상태 변수
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flashEffect, setFlashEffect] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // 줌 레벨 상태 관리
  const [track, setTrack] = useState(null); // 현재 비디오 트랙 상태 관리

  // 컴포넌트가 처음 렌더링될 때 카메라 스트림을 설정
  useEffect(() => {
    let localStream;

    const startCamera = () => {
      navigator.mediaDevices.getUserMedia({ video: { zoom: true } })
        .then(stream => {
          localStream = stream; // 로컬 스트림 저장
          const videoTrack = stream.getVideoTracks()[0]; // 비디오 트랙 추출
          setTrack(videoTrack); // 트랙 저장

          if (videoRef.current) {
            videoRef.current.srcObject = stream; // 비디오 스트림을 설정
          }
        })
        .catch(error => {
          if (error.name === 'NotReadableError') {
            console.error("카메라 접근 중 에러 발생! 카메라가 다른 프로그램에서 사용 중입니다.", error);
          } else {
            console.error("카메라 접근 중 에러 발생!", error);
          }
        });
    };

    startCamera();

    // 컴포넌트가 사라질 때 비디오 트랙(= 영상 데이터 스트림)을 중지
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop()); // 모든 트랙 중지
      }
    };
  }, []);

  // 사진 캡처를 처리하는 함수
  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d'); // 캔버스에 그리기 위한 컨텍스트 얻기

      // 캔버스 크기를 비디오 크기에 맞추고 비디오 화면을 캔버스에 그리기
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // 플래시 효과
      setFlashEffect(true);
      setTimeout(() => setFlashEffect(false), 200);

      // 이미지를 Blob 형태로 변환하고 서버에 업로드
      canvas.toBlob((blob) => {
        if (blob) {
          console.log(blob); // Blob이 제대로 생성되었는지 확인
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
        } else {
          console.error("Blob 생성 실패");
        }
      }, 'image/png');
      
    }
  };

  // 줌 레벨을 변경하는 함수
  const handleZoomChange = (zoomValue) => {
    if (track) {
      const capabilities = track.getCapabilities(); // 비디오 트랙의 기능을 확인
      if (capabilities.zoom) {
        track.applyConstraints({ advanced: [{ zoom: zoomValue }] }) // 줌 값 적용
          .then(() => {
            setZoomLevel(zoomValue); // 줌 레벨 업데이트
          })
          .catch(error => {
            console.error("줌 조정 실패", error); // 줌 조정 실패 시 오류 출력
          });
      }
    }
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full h-screen bg-black">
      {/* 비디오 프리뷰 */}
      <video ref={videoRef} autoPlay className="absolute top-0 left-0 z-10 object-cover w-full h-full" />
      
      {/* 레이어 이미지가 있으면 표시 */}
      {layerImage && (
        <img src={layerImage} alt="Layer" className="absolute top-0 left-0 z-20 object-contain w-full h-full opacity-50" />
      )}
      
      {/* 캔버스 (화면을 캡처할 때 사용) */}
      <canvas ref={canvasRef} className="hidden"></canvas>

      {/* 플래시 효과 */}
      {flashEffect && (
        <div className="absolute top-0 left-0 z-40 w-full h-full bg-white opacity-75"></div>
      )}

      {/* 상단바 */}
      <div className="absolute top-0 z-30 flex justify-between w-full px-4 py-2 text-white bg-black">
        <FaCog size={24} /> {/* 설정 아이콘 */}
        <div className="flex space-x-4">
          <FaBolt size={24} /> {/* 플래시 아이콘 */}
          <FaClock size={24} /> {/* 타이머 아이콘 */}
          <span>3:4</span> {/* 화면 비율 */}
          <span>12M</span> {/* 해상도 */}
          <FaSyncAlt size={24} /> {/* 전환 아이콘 */}
        </div>
      </div>

      {/* 줌 버튼 */}
      <div className="absolute z-30 flex items-center justify-center w-full text-white bottom-32">
        {/* 줌 레벨 0.5 */}
        <button 
          onClick={() => handleZoomChange(0.5)}
          className={`px-4 py-2 bg-gray-800 rounded-full ${zoomLevel === 0.5 ? 'bg-gray-600' : ''}`}
        >.5</button>
        
        {/* 줌 레벨 1 */}
        <button 
          onClick={() => handleZoomChange(1)}
          className={`px-4 py-2 mx-4 bg-gray-800 rounded-full ${zoomLevel === 1 ? 'bg-gray-600' : ''}`}
        >1x</button>
        
        {/* 줌 레벨 2 */}
        <button 
          onClick={() => handleZoomChange(2)}
          className={`px-4 py-2 bg-gray-800 rounded-full ${zoomLevel === 2 ? 'bg-gray-600' : ''}`}
        >2</button>
      </div>

      {/* 하단바 */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 text-white bg-black">
        <FaImages size={36} /> {/* 갤러리 아이콘 */}
        
        {/* 사진 캡처 버튼 */}
        <button 
          onClick={handleCapture}
          className="p-4 text-white bg-white rounded-full"
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
          }}
        >
          <FaCamera size={40} color="black" /> {/* 카메라 아이콘 */}
        </button>

        {/* 뒤로가기 버튼 */}
        <button 
          onClick={() => navigate(-1)} 
          className="p-4 bg-white rounded-full">
          <FaLongArrowAltLeft size={20} color='black' /> {/* 뒤로가기 아이콘 */}
        </button>
      </div>

      {/* 모달 컴포넌트 */}
      <CameraModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default CameraComponent;