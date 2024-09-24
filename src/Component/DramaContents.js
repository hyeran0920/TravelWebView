import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DramaContents = () => {
  const [dramaList, setDramaList] = useState([]);  // 영화 제목 목록을 저장할 상태
  const [loading, setLoading] = useState(true);    // 로딩 상태 관리
  const [error, setError] = useState(null);        // 에러 상태 추가
  const navigate = useNavigate();  // useNavigate 사용

  useEffect(() => {
    setLoading(true);
    
    // Axios 요청
    axios.get('http://localhost:8080/content/getAllDramas')
      .then(response => {
        setDramaList(response.data); // 응답 데이터를 상태로 설정 (문자열 리스트)
        setLoading(false);           // 로딩 완료
      })
      .catch(error => {
        console.error("데이터 가져오는 중 에러 발생!", error);
        setError("데이터를 가져오는 중 오류가 발생했습니다."); // 에러 메시지 설정
        setLoading(false);  // 에러 발생 시 로딩 종료
      });
  }, []);

  // 로딩 중일 때 표시
  if (loading) {
    return <p>Loading drama titles...</p>;
  }

  // 에러 발생 시 표시
  if (error) {
    return <p>{error}</p>;
  }

  // 데이터가 없을 경우 처리
  if (dramaList.length === 0) {
    return <p>No drama titles available.</p>;
  }

    // 드라마 박스를 클릭하면 해당 영화를 선택하고 페이지로 이동
    const handleDramaClick = (contentTitle) => {
      navigate(`/contentLocationList/${contentTitle}`); // 드라마 제목으로 URL 이동
    };

    return (
      <div>
        <div className="p-5">
          <h2 className="text-2xl font-bold mb-5">드라마 목록</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">  
            {dramaList.map((title, index) => (
              <div
                key={index}
                onClick={() => handleDramaClick(title)} // 클릭 시 페이지 이동
                className="bg-gray-400 rounded-lg h-40 flex items-end p-5 text-black font-bold transform transition-transform duration-300 hover:scale-105 active:scale-95 active:bg-gray-100 cursor-pointer"
              >
                <div>
                  <div className="text-left">{title}</div>
                  <div className="text-sm font-normal mt-1">드라마</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };




//   // 데이터가 있을 때 표시 (문자열 리스트로 접근)
//   return (
// <div>
//     <div style={{ padding: '20px' }}>
//       <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>드라마 목록</h2>
//       <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//         {dramaList.map((title, index) => (
//           <div
//             key={index}
//             style={{
//               backgroundColor: 'gray',
//               borderRadius: '10px',
//               overflow: 'hidden',
//               height: '150px',
//               position: 'relative',
//               display: 'flex',
//               alignItems: 'flex-end',
//               padding: '20px',
//               color: 'black',
//               fontSize: '18px',
//               fontWeight: 'bold',
//             }}
//           >
//             <div>
//               <div style={{textAlign:'left'}}>{title}</div>
//               <div style={{ fontSize: '14px', fontWeight: 'normal', marginTop: '5px' }}>드라마</div>
//             </div>
//           </div>
//         ))}
//         <br/>
//       </div>
//     </div>

//     {/* <div>
//       <h1>Drama Titles</h1>
//       <ul>
//         {dramaList.map((title, index) => (
//           <li key={index}> {/* key로 인덱스 사용 }
//             {index + 1}. {title}  {/* title은 문자열이므로 바로 출력 }
//           </li>
//         ))}
//       </ul>
//     </div> */}
//     </div>
//   );
// };

export default DramaContents;
