import { forwardRef, useImperativeHandle ,useRef} from "react";
const OrderSubmissionModal=forwardRef((prop,ref)=> {
    const DialogNewRef=useRef();
    useImperativeHandle(ref,()=>({
        open:()=>DialogNewRef.current.showModal(),
        close:()=>DialogNewRef.current.close()
    }),[]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        DialogNewRef.current.close();
    };

        return (
            <dialog ref={DialogNewRef} className="OrderDialog">
                <h2>Almost There! Need Some Addional Imformation</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-data">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required />
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" required />
                    <button type="submit">Submit</button>
                    </div>
                </form>
            </dialog>

    )

});

export default OrderSubmissionModal;