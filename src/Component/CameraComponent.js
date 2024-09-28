import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCamera } from "react-icons/fa";
import axios from 'axios';

const CameraComponent = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null); 
  const location = useLocation();
  const navigate = useNavigate();
  const { layerImage } = location.state;

  useEffect(() => {
    let localStream;

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        localStream = stream;
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

      canvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append('file', blob, 'captured_image.png');

        // 서버에 이미지 전송
        axios.post('http://localhost:8080/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log("이미지 업로드 성공", response.data);
        })
        .catch(error => {
          console.error("이미지 업로드 실패", error);
        });
      }, 'image/png');
    }
  };

  return (
    <div className="relative w-full h-screen">
      <video ref={videoRef} autoPlay className="absolute top-0 left-0 z-10 object-cover w-full h-full" />
      {layerImage && (
        <img src={layerImage} alt="Layer" className="absolute top-0 left-0 z-20 object-contain w-full h-full opacity-50" />
      )}
      <canvas ref={canvasRef} className="hidden"></canvas>
      {/* 카메라 버튼 */}
      <button 
        onClick={handleCapture}
        className="absolute z-30 p-2 text-white bg-blue-500 rounded-lg"
        style={{
          bottom: '10%',  // 하단에서 10% 위로
          left: '50%',    // 수평 중앙에 위치
          transform: 'translateX(-50%)'  // 중앙 정렬
        }}
      >
        <FaCamera />
      </button>
      {/* 뒤로가기 버튼 */}
      <button 
        onClick={() => navigate(-1)} 
        className="absolute z-30 p-2 bg-gray-200 rounded-lg top-4 left-4">
        뒤로가기
      </button>
    </div>
  );
};

export default CameraComponent;

// //사진 다운로드 받는 버전
// import React, { useRef, useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const CameraComponent = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null); // 캡처를 위한 canvas ref 추가
//   const [stream, setStream] = useState(null);
//   const location = useLocation();  // 명장면 따라 찍기 버튼에서 넘어온 데이터 받기
//   const navigate = useNavigate();

//   const { layerImage } = location.state;  // 넘어온 layerImage 가져오기

//   useEffect(() => {
//     let localStream;
    
//     // 카메라 접근
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then(stream => {
//         localStream = stream;
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       })
//       .catch(error => {
//         console.error("카메라 접근 중 에러 발생!", error);
//       });
  
//     return () => {
//       if (localStream) {
//         localStream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);  // 빈 배열로 의존성을 설정하여 한 번만 실행되도록 함
  
//   // 캡처 함수 (레이어 없이 카메라 화면만 캡처)
//   const handleCapture = () => {
//     if (videoRef.current && canvasRef.current) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       const context = canvas.getContext('2d');

//       // 캔버스 크기 설정
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       // 비디오 화면을 캔버스에 그리기 (레이어는 그리지 않음)
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);

//       // 이미지 데이터를 base64로 변환 (카메라 화면만)
//       const imageData = canvas.toDataURL('image/png');

//       // 다운로드 링크 생성
//       const link = document.createElement('a');
//       link.href = imageData;  // Base64 이미지 URL
//       link.download = 'captured_image.png';  // 저장할 파일 이름 설정
//       link.click();  // 링크 클릭 이벤트 발생 -> 이미지 다운로드
//     }
//   };

//   return (
//     <div className="relative w-full h-screen">
//       {/* 카메라 화면 */}
//       <video ref={videoRef} autoPlay className="absolute top-0 left-0 z-10 object-cover w-full h-full" />

//       {/* Layer 이미지 오버레이 (캡처할 때는 제외) */}
//       {layerImage && (
//         <img
//           src={layerImage}
//           alt="Layer"
//           className="absolute top-0 left-0 z-20 object-contain w-full h-full opacity-50"  // 비디오보다 높은 z-index 설정
//         />
//       )}

//       {/* 촬영한 이미지를 그릴 캔버스 */}
//       <canvas ref={canvasRef} className="hidden"></canvas> {/* 캡처를 위한 캔버스 */}

//       {/* 촬영하기 버튼 */}
//       <button 
//         onClick={handleCapture}
//         className="absolute z-30 p-2 text-white bg-blue-500 rounded-lg bottom-10 left-4">
//         촬영하기
//       </button>

//       {/* 뒤로 가기 버튼 */}
//       <button 
//         onClick={() => navigate(-1)} 
//         className="absolute z-30 p-2 bg-gray-200 rounded-lg top-4 left-4">
//         뒤로가기
//       </button>
//     </div>
//   );
// };

// export default CameraComponent;