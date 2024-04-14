import { useContext } from "react"
import { FoodStoreContext } from "../store/FoodStoreContext"
export default function CartTile({foodId,foodImage,foodTitle,foodPrice,foodQuantity}){

    const {state,actions} = useContext(FoodStoreContext);
    function handleChange(event){
        actions.updateQuantity(foodId,event.target.value);
    }
    return(
        <div className="cart-tile">
            <img src={foodImage} alt="" />
            <p>{foodTitle}</p>
            <input min={1} type="Number" onChange={(event)=>handleChange(event)} value={foodQuantity} />
            <p>${foodPrice.toFixed(2)*foodQuantity}</p>
        </div>
    )
}