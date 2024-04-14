import cartIcon from '/cartIcon.svg'
import { useContext,useRef } from 'react'
import CartModel from './CartModel';
import { FoodStoreContext } from '../store/FoodStoreContext'

export  default function Header() {
    const cartRef=useRef();

    const {state} = useContext(FoodStoreContext);

    function handleClick() {
        cartRef.current.open();
    }

    return (
        <div className="Header">
            <div className="header-content">
                <h1>BiteQuest</h1>
                <p>"Discover flavors from around the corner or around the globe."</p>
            </div>

            <div className='cart-icon-number'>
                <h2>{state.cart.length}</h2>
                <button onClick={handleClick}><img src={cartIcon} alt="" /></button>
            </div>
            <CartModel ref={cartRef} />

        </div>

    )




}