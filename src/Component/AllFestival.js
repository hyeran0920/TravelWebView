import React, { useEffect, useState } from 'react';
import axios from 'axios';

// 지역별 색상을 정의한 객체
const cityColors = {
  '강원특별자치도': '#FF3F71',
  '경기도': '#FFB74D',
  '경상남도': '#4DB6AC',
  '경상북도': '#9575CD',
  '광주광역시': '#F06292',
  '대구광역시': '#64B5F6',
  '부산광역시': '#BA68C8',
  '서울특별시': '#FF8A65',
  '울산광역시': '#81C784',
  '인천광역시': '#A1887F',
  '전라남도': '#4FC3F7',
  '전북특별자치도': '#AED581',
  '제주특별자치도': '#FFD54F',
  '충청남도': '#E57373',
  '충청북도': '#7986CB',
  '대전광역시': '#FDD835'
};

const cityShortNames = {
    '강원특별자치도': '강원',
    '경기도': '경기',
    '경상남도': '경남',
    '경상북도': '경북',
    '광주광역시': '광주',
    '대구광역시': '대구',
    '부산광역시': '부산',
    '서울특별시': '서울',
    '울산광역시': '울산',
    '인천광역시': '인천',
    '전라남도': '전남',
    '전북특별자치도': '전북',
    '제주특별자치도': '제주',
    '충청남도': '충남',
    '충청북도': '충북',
    '대전광역시': '대전'
  };

const seasons = ['봄', '여름', '가을', '겨울'];

const AllFestival = () => {
  const [selectedSeason, setSelectedSeason] = useState('봄'); // 디폴트 선택된 계절
  const [allSeasonFestivalList, setAllSeasonFestivalList] = useState([]); // 전체 축제 리스트
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    if (selectedSeason) {
      // 선택된 계절이 있을 때만 API 요청
      setLoading(true); // 로딩 시작
      axios
        .get(`http://localhost:8080/festival/season`, {
          params: {
            season: selectedSeason, // 쿼리 파라미터로 선택된 계절 전달
          },
        })
        .then((response) => {
          setAllSeasonFestivalList(response.data); // 응답 데이터를 상태로 설정
          setLoading(false); // 로딩 완료
        })
        .catch((error) => {
          console.error('데이터 가져오는 중 에러 발생!', error);
          setError('데이터를 가져오는 중 오류가 발생했습니다.'); // 에러 메시지 설정
          setLoading(false); // 에러 발생 시 로딩 종료
        });
    }
  }, [selectedSeason]); // 선택된 계절이 변경될 때마다 실행

  // 계절 선택 버튼 핸들러
  const handleSeasonClick = (season) => {
    setSelectedSeason(season); // 선택된 계절 설정
  };

  // 로딩 상태 처리
  if (loading) {
    return <p>로딩 중입니다...</p>;
  }

  // 에러 상태 처리
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bg-white">
      <div className='p-10 pb-1 pt-20 mt-0 sticky top-0 z-[20] bg-white h-30'>

        {/* 사계절 선택 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', gap: '10px' }}>
          {seasons.map((season) => (
            <button
              key={season}
              onClick={() => handleSeasonClick(season)}
              style={{
                backgroundColor: selectedSeason === season ? '#79353E' : '#ddd',
                color: selectedSeason === season ? 'white' : 'black',
                borderRadius: '20px',
                padding: '10px 20px',
                fontSize: '16px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {season}
            </button>
          ))}
        </div>
      </div>

      <div className='p-10 pt-1 mb-5'>
        {/* 축제 목록 카드 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          {allSeasonFestivalList.map((festival) => (
            <div
              key={festival.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                textAlign: 'left', // 카드 전체를 왼쪽 정렬
                position: 'relative', // 추가: 도시 이름을 카드 상단에 배치하기 위한 relative 설정
                backgroundColor: 'white',
              }}
            >
              {/* 도시 정보 (오른쪽 상단에 둥근 틀로 표시) */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '10px',
                  padding: '5px 15px',
                  marginBottom: '10px',
                  borderRadius: '20px',
                  backgroundColor: cityColors[festival.festival_city] || '#ff6f61', // 지역별 색상 적용, 기본값은 '#ff6f61'
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '13px',
                }}
              >
                {cityShortNames[festival.festival_city] || festival.festival_city}
              </div>

              <h3 className="text-xl" style={{ marginTop: '22px', fontWeight: 'bold', fontSize: '20px' }}>
                {festival.festival_name}
              </h3>
              <p style={{ fontSize: '14px', marginBottom: '8px', color: 'gray' }}>
                {festival.festival_begin_date} ~ {festival.festival_end_date}
              </p>
              <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>{festival.festival_addr}</p>
              <p style={{ fontSize: '12px', color: 'gray' }}>{festival.festival_content}</p>
              {/* 홈페이지 링크 버튼 */}
              {festival.festival_homepage && (
                <div style={{ textAlign: 'center', marginTop: '10px' }}> {/* 가운데 정렬을 위해 textAlign: center 추가 */}
                  <a
                    href={festival.festival_homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '10px 20px',
                      color: '#007BFF',
                      borderRadius: '5px',
                      textDecoration: 'none',
                      fontSize: '16px',
                      transition: 'background-color 0.3s',
                      fontWeight: 'bold',
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#007BFF')}
                  >
                    홈페이지 바로가기 &gt;
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllFestival;
