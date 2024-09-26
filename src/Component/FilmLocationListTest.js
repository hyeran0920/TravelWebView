// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const FilmLocationList = () => {
//   const [layers, setLayers] = useState([]); // Layers fetched from the backend
//   const [loading, setLoading] = useState(true); // Loading state for the API call
//   const [error, setError] = useState(null); // Error state for API failures

//   // Fetch layers from the /layer/all endpoint
//   useEffect(() => {
//     axios
//       .get('http://localhost:8080/layer/all')
//       .then((response) => {
//         setLayers(response.data); // Set the layers data
//         setLoading(false); // Set loading to false after data is fetched
//       })
//       .catch((error) => {
//         console.error('Error fetching layers:', error);
//         setError('Failed to fetch layers');
//         setLoading(false); // Stop loading if there's an error
//       });
//   }, []);

//   // Show loading state
//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   // Show error state if there's an issue fetching data
//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div style={{ padding: '20px', backgroundColor:"black" }}>
//       <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Layer Data from Backend</h2>
//       <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//         {/* Display layers fetched from the backend */}
//         {layers.map((layer, index) => (
//           <div
//             key={index}
//             style={{
//               backgroundImage: `url(http://localhost:8080/layer/files/${layer.countNum})`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//               borderRadius: '10px',
//               overflow: 'hidden',
//               padding: '20px',
//               color: 'white',
//               height: '200px', // Adjust height for better visibility
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'flex-end',
//             }}
//           >
//             {/* Display each property inside the div */}
//             <div>
//               <strong>파일 번호:</strong> {layer.countNum}
//             </div>
//             <div>
//               <strong>타이틀 이름:</strong> {layer.title_nm}
//             </div>
//             <div>
//               <strong>장소 이름:</strong> {layer.place_name}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FilmLocationList;
