import React from "react";
import { useNavigate } from "react-router-dom";  // useNavigate 훅 가져오기
import KoreaFood from '../img/KoreaFood.png';
import Chicken from '../img/chicken.png';  // Chicken 이미지 import
import Burger from '../img/burger.png';    // Burger 이미지 import
import snackfood from '../img/snackfood.png';    
import steak from '../img/steak.png';    
import spaghetti from '../img/spaghetti.png';   
import coffee from '../img/coffee.png';   
import night from '../img/night.png';   
import noodle from '../img/noodle.png';   
import sushi from '../img/sushi.png';   
import pizza from '../img/pizza.png';   
import wok from '../img/wok.png';   

const FoodIcon = () => {
  const navigate = useNavigate();  // useNavigate 훅 사용

  // 이미지와 라벨, 경로를 매칭하는 배열
  const foodData = [
    { label: "한식", image: KoreaFood, path: '/FoodRecom' },
    { label: "양식", image: spaghetti, path: '/FoodRecom' }, // example 경로
    { label: "치킨", image: Chicken, path: '/FoodRecom' },
    { label: "패스트푸드", image: Burger, path: '/FoodRecom' },
    { label: "분식", image: snackfood, path: '/FoodRecom' },
    { label: "아시안", image: noodle, path: '/FoodRecom' },
    { label: "고기", image: steak, path: '/FoodRecom' },
    { label: "카페", image: coffee, path: '/FoodRecom' },
    { label: "회/초밥", image: sushi, path: '/FoodRecom' },
    { label: "피자", image: pizza, path: '/FoodRecom' },
    { label: "야식", image: night, path: '/FoodRecom' },
    { label: "중식", image: wok, path: '/FoodRecom' },
  ];

  // 음식 아이콘을 클릭했을 때 해당 경로로 이동하는 함수
  const handleIconClick = (path) => {
    navigate(path);  // 클릭 시 각 음식의 경로로 이동
  };

  return (
    <div>
      <br />
      <br />
      <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '20px' }}>오늘은 뭐 먹지?</h2>
      <div className="grid grid-cols-4 gap-4 p-4">
        {/* 각 이미지를 반복하면서 음식 이름을 표시 */}
        {foodData.map((food, index) => (
          <div 
            key={index} 
            className="text-center cursor-pointer"  // 마우스 커서를 포인터로 변경
            onClick={() => handleIconClick(food.path)}  // 이미지 클릭 시 해당 경로로 이동
          >
            <img src={food.image} alt={food.label} className="w-14" />
            <p className="mt-2 text-sm font-bold">{food.label}</p>
          </div>
        ))}
      </div>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px' }}>추천 맛집</h2>


    </div>
  );
};

export default FoodIcon;
