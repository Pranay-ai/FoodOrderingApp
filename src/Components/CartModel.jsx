import { useContext } from "react"
import { FoodStoreContext } from "../store/FoodStoreContext"
import { forwardRef, useImperativeHandle ,useRef} from "react";
import CartTile from "./CartTile";
const CartModel=forwardRef((props,ref)=> {
    const { state } = useContext(FoodStoreContext);
    const DialogRef=useRef();
    useImperativeHandle(ref,()=>({
        open:()=>DialogRef.current.showModal(),
        close:()=>DialogRef.current.close()
    }),[]);
    const total=state.cart.reduce((acc,curr)=>acc+curr.price*curr.quantity,0);
    return (
        <dialog ref={DialogRef}>
            <div className="cart-modal">
                <h2>Cart</h2>
                <div className="cart-items">
                    {state.cart.map(cartItem => (
                        <CartTile key={cartItem.id} foodId={cartItem.id} foodImage={`http://localhost:3000/${cartItem.image}`} foodTitle={cartItem.name} foodPrice={Number(cartItem.price)} foodQuantity={Number(cartItem.quantity)}/>
                    ))}
                </div>
            <div className="cart-modal-footer">
            <div className="cart-total">
                    <h3>Total: ${total.toFixed(2)}</h3>
                </div>
                <div className="cart-buttons">
                    <button onClick={()=>DialogRef.current.close()}>Close</button>
                    <button>Checkout</button>
                </div>
            </div>
        </div>
        </dialog>


    )

});

export default CartModel;