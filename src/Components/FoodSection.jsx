import { useContext,useRef} from "react";
import { useState } from "react";
import FoodCard from "./FoodCard.jsx";
import { FoodStoreContext } from "../store/FoodStoreContext";

export default function FoodSection() {

    const {state} = useContext(FoodStoreContext);


    return (
        <>
        <div className="food-section">
        {state.meals.length === 0 &&<div className="loader"></div>}
                {state.meals.map((meal) => {
                    return <FoodCard key={meal.id} foodId={meal.id} foodTitle={meal.name} foodPrice={(Number(meal.price))} foodDescription={meal.description} foodImage={`http://localhost:3000/${meal.image}`} ></FoodCard>
                })}
        </div></>
        
    );
}