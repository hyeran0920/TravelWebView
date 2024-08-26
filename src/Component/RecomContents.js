import React from 'react';

const recommendations = [
  { name: '속초 영금정', description: '강원 속초시 영금정로 43', color: '#FF6347' },
  { name: '설악산 국립공원', description: '강원 속초시 설악산로 1091', color: '#4682B4' },
  { name: '경포대', description: '강원 강릉시 창해로 365', color: '#32CD32' },
  { name: '주문진', description: '강원 강릉시 주문진읍 해안로 173', color: '#FFD700' },
  { name: '정동진', description: '강원 강릉시 정동진리', color: '#FFA07A' },
];

const RecomContents = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>추천 여행지</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {recommendations.map((place, index) => (
          <div
            key={index}
            style={{
              backgroundColor: place.color,
              borderRadius: '10px',
              overflow: 'hidden',
              height: '150px',
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '20px',
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            <div>
              <div style={{textAlign:'left'}}>{place.name}</div>
              <div style={{ fontSize: '14px', fontWeight: 'normal', marginTop: '5px' }}>{place.description}</div>
            </div>
          </div>
        ))}
        <br/>
      </div>
    </div>
  );
};

export default RecomContents;
