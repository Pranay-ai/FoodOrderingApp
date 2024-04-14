import cartIcon from '/cartIcon.svg'
import { useContext } from 'react'
import { FoodStoreContext } from '../store/FoodStoreContext'

export  default function Header() {

    const {state} = useContext(FoodStoreContext);

    return (
        <div className="Header">
            <div className="header-content">
                <h1>BiteQuest</h1>
                <p>"Discover flavors from around the corner or around the globe."</p>
            </div>

            <div className='cart-icon-number'>
                <h2>{state.cart.length}</h2>
                <button><img src={cartIcon} alt="" /></button>
            </div>


        </div>

    )




}