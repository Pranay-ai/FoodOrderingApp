import cartIcon from '/cartIcon.svg'
import OrderSubmissionModal from './OrderSubmissionModal'
import { useContext,useRef } from 'react'
import CartModel from './CartModel';
import { FoodStoreContext } from '../store/FoodStoreContext'
export  default function Footer() {
    const {orderModalRef} = useContext(FoodStoreContext);

    return (

        <div className="Footer">
            <div className="header-content">
                <h3>Copyright</h3>
                <p>"Guda Pranay Netha"</p>
            </div>


        </div>
        

    )




}