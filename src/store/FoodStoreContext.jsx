import React, { createContext, useReducer, useEffect , useRef} from "react";

export const FoodStoreContext = createContext();

const initialState = {
    meals: [],
    cart: [],
    cartTotal: 0,
    isOrder: false
};

function reducer(state, action) {
    switch (action.type) {
        case "Add-To-Cart":
            const mealToAdd = state.meals.find(meal => meal.id === action.payload);
            mealToAdd.quantity = 1;
            return {
                ...state,
                cart: [...state.cart, mealToAdd],
            };
        case "Remove-From-Cart":
            return {
                ...state,
                cart: state.cart.filter(meal => meal.id !== action.payload)
            };
        case "Fetch-Meals":
            return {
                ...state,
                meals: action.payload
            };
        case "Update-Quantity":
            return{
                ...state,
                cart: state.cart.map(meal=> (
                    meal.id===action.payload.foodId ?{...meal, quantity: action.payload.quantity} : meal
                ))
            };
        case "Set-Order-Submit":
            return{
                ...state,
                isOrder:!state.isOrder
            };
        case "Clear-Cart":
            return{
                ...state,
                cart: [],
            };

        default:
            return state;
    }


}

export default function FoodStoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const orderModalRef=useRef();

    useEffect(() => {
        fetch("http://localhost:3000/meals")
        .then(response => response.json())
        .then(data => {
            dispatch({ type: "Fetch-Meals", payload: data });
        })
        .catch(error => console.error("Failed to fetch meals", error));
    }, []);


    const actions = {
        addToCart: foodId => {
            dispatch({ type: "Add-To-Cart", payload: foodId });
        },
        removeFromCart: foodId => {
            dispatch({ type: "Remove-From-Cart", payload: foodId });
        },
        ifInCart: foodId => {
            return state.cart.some(meal => meal.id === foodId);
        },
        updateQuantity:(foodId, quantity) => {
            dispatch({type:"Update-Quantity", payload: {foodId, quantity}});
        },
        getCartTotal: () => {
            return state.cart.reduce((acc, meal) => acc + meal.price * meal.quantity, 0);
        },
        setOrderSubmit:()=>{
            dispatch({type:"Set-Order-Submit"});
        },
        clearCart:()=>{
            dispatch({type:"Clear-Cart"});
        
        }


    };

    return (
        <FoodStoreContext.Provider value={{ state, actions , orderModalRef}}>
            {children}
        </FoodStoreContext.Provider>
    );
}
