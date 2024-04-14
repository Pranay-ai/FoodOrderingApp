import { useContext } from "react"
import { FoodStoreContext } from "../store/FoodStoreContext"
import deleteicon from '/delete-icon.svg'
export default function CartTile({foodId,foodImage,foodTitle,foodPrice,foodQuantity}){

    const {state,actions} = useContext(FoodStoreContext);
    function handleChange(event){
        actions.updateQuantity(foodId,event.target.value);
    }

    function handleRemove(){
        actions.removeFromCart(foodId);
    }
    return(
        <div className="cart-tile">
            <img src={foodImage} alt="" />
            <div className="cart-item-title">
                <p >{foodTitle}</p>
                <button className="remove-cart" onClick={()=>handleRemove()} ><img src={deleteicon} alt="" srcset="" /></button>
            </div>
            <input min={1} type="Number" onChange={(event)=>handleChange(event)} value={foodQuantity} />
            <p className="price">${foodPrice.toFixed(2)*foodQuantity}</p>
    
        </div>
    )
}

