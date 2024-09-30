import React from "react";
import KoreaFood from '../img/KoreaFood.jpg';
import Chicken from '../img/chicken.png';  // Chicken 이미지 import
import Burger from '../img/burger.png';    // Burger 이미지 import
import snackfood from '../img/snackfood.png';    
import ricenoodle from '../img/ricenoodle.png';    
import steak from '../img/steak.png';    
import buffet from '../img/buffet.png';   
// import buffet from '../img/buffet.png';   
// import the rest of your images here...

const FoodIcon = () => {
  // 이미지와 라벨을 매칭하는 배열
  const foodData = [
    { label: "한식", image: KoreaFood },
    { label: "치킨", image: Chicken },
    { label: "패스트푸드", image: Burger },
    { label: "분식", image: snackfood },   // example, replace with your own image
    { label: "동양식", image: ricenoodle }, // example, replace with your own image
    { label: "서양식", image: steak }, // example, replace with your own image
    // { label: "뷔페", image: buffet },   // example, replace with your own image
  ];

  return (
    <div>
      <br />
      <div className="grid grid-cols-3 gap-4 p-4">
        {/* 각 이미지를 반복하면서 음식 이름을 표시 */}
        {foodData.map((food, index) => (
          <div key={index} className="text-center">
            <img src={food.image} alt={food.label} className="w-24" />
            <p className="mt-2 text-lg font-bold">{food.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodIcon;
