
import { forwardRef, useImperativeHandle ,useRef,useContext} from "react";
import { FoodStoreContext } from "../store/FoodStoreContext";
const OrderSubmissionModal=forwardRef((prop,ref)=> {
    const DialogNewRef=useRef();
    const {state,actions}=useContext(FoodStoreContext);
    useImperativeHandle(ref,()=>({
        open:()=>DialogNewRef.current.showModal(),
        close:()=>DialogNewRef.current.close()
    }),[]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        actions.setOrderSubmit();
        const orderData={
            items:state.cart,
            customer:{
                name:data.name,
                email:data.email,
                street:data.street,
                'postal-code':data.postal,
                city:data.city
            }
        };
        console.log(orderData);
        const postOrder=async()=>{
            const response=await fetch("http://localhost:3000/orders",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({order:orderData})
            });
            console.log(response);
            if(response.ok){
                actions.clearCart();
            }
        };
        postOrder();
        }

    const handleCloseOrder=()=>{
        actions.setOrderSubmit();
        DialogNewRef.current.close();
    }

        
        return (
                
                <dialog ref={DialogNewRef} className="OrderDialog">
                    {!state.isOrder ?           (<><h2>Almost There! Need Some Addional Imformation</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-data">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required />
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                        <label htmlFor="street">Address</label>
                        <input type="text" id="street" name="street" required />
                        <label htmlFor="postal">Postal Code</label>
                        <input type="text" id="postal" name="postal" required />
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" name="city" required />
                        <button type="submit">Submit</button>
                        </div>
                    </form></>) : (<><h2>Order Submitted</h2>
            <button onClick={()=>handleCloseOrder()}>Close</button></>)}

         </dialog>

    )

});

export default OrderSubmissionModal;