import { forwardRef, useRef, useContext, useState,useImperativeHandle } from "react";
import { FoodStoreContext } from "../store/FoodStoreContext";
import { act } from "react-dom/test-utils";

const OrderSubmissionModal = forwardRef((props, ref) => {
    const DialogNewRef = useRef();
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false); // Add a new state variable [isError
    const { state, actions } = useContext(FoodStoreContext);

    useImperativeHandle(ref, () => ({
        open: () => DialogNewRef.current.showModal(),
        close: () => DialogNewRef.current.close()
    }), []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading to true
        setIsError(false); // Reset isError to false
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        actions.setOrderSubmit();

        const orderData = {
            items: state.cart,
            customer: {
                name: data.name,
                email: data.email,
                street: data.street,
                'postal-code': data.postal,
                city: data.city
            }
        };

        try {
            const response = await fetch("http://localhost:3000/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ order: orderData })
            });

            if (response.ok) {
                actions.clearCart();
            } else {
                setIsError(true); // Set isError to true
                throw new Error('Failed to submit order');
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            actions.setOrderSubmit();
            setIsError(true); // Set isError to true
        } finally {
            setLoading(false); // Set loading to false regardless of outcome

        }
    };

    const handleCloseOrder = () => {
        actions.setOrderSubmit();
        DialogNewRef.current.close();
    };

    return (
        <dialog ref={DialogNewRef} className="OrderDialog">
            {loading && <div className="loader"></div>}
            {!state.isOrder && !loading && (
                <>
                    <h2>Almost There! Need Some Additional Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-data">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" required />
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required />
                            <label htmlFor="street">Address</label>
                            <input type="text" id="street" name="street" required />
                            <label htmlFor="postal">Postal Code</label>
                            <input type="text" id="postal" name="postal"  />
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" name="city" required />
                            <button type="submit">Submit</button>
                            {isError && <p className="error">Failed to submit order. Please Check Your Details Again</p>} 
                        </div>
                    </form>
                </>
            )}
            {state.isOrder && !loading &&!isError && (
                <>
                    <h2>Order Submitted</h2>
                    <button onClick={handleCloseOrder}>Close</button>
                </>
            )}
        </dialog>
    );
});

export default OrderSubmissionModal;
