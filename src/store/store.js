import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./reducers/productReducer";
import { errorReducer } from "./reducers/errorReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import { cartReducer } from "./reducers/cartReducer";
import { authReducer } from "./reducers/authReducer";

const cartItems = localStorage.getItem("cartItems") 
    ? JSON.parse(localStorage.getItem("cartItems"))
    : []

const user = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : []

const initialState = {
    carts: { cart: cartItems },
    auth: { user: user }
}

const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoryReducer,
        carts: cartReducer,
        auth: authReducer,
        errors: errorReducer
    },
    preloadedState: initialState
})

export default store