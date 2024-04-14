import React, { createContext, useReducer, useEffect } from "react";

export const FoodStoreContext = createContext();

const initialState = {
    meals: [],
    cart: []
};

function reducer(state, action) {
    switch (action.type) {
        case "Add-To-Cart":
            const mealToAdd = state.meals.find(meal => meal.id === action.payload);
            return {
                ...state,
                cart: [...state.cart, mealToAdd]
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
        default:
            return state;
    }
}

export default function FoodStoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

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
        }
    };

    return (
        <FoodStoreContext.Provider value={{ state, actions }}>
            {children}
        </FoodStoreContext.Provider>
    );
}
