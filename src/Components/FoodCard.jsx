import React from 'react';
import cartIcon from '/cartIcon.svg'
import { FoodStoreContext } from '../store/FoodStoreContext';
import { useContext } from 'react';

function FoodCard({foodId, foodImage, foodTitle, foodPrice, foodDescription }) {
  const { state,actions} = useContext(FoodStoreContext);
  return (
    <div className="food-card">
      <img src={foodImage} alt={foodTitle} className="food-image" />
      <div className="food-title">{foodTitle}</div>
      <div className="food-price">${
        foodPrice.toFixed(2)}
        <button onClick={()=>actions.addToCart(foodId)}><img src={cartIcon} alt="cart-icon" className="cart-icon" /></button>
        </div>
      <div className="food-description">{foodDescription}</div>
    </div>
  );
}

export default FoodCard;
