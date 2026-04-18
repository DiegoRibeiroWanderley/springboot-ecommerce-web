import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./reducers/productReducer";
import { errorReducer } from "./reducers/errorReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import { cartReducer } from "./reducers/cartReducer";
import { authReducer } from "./reducers/authReducer";
import { paymentMethodReducer } from "./reducers/paymentMethodReducer";

const user = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : [];

const initialState = {
  auth: { user: user },
};

const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
    carts: cartReducer,
    auth: authReducer,
    payment: paymentMethodReducer,
    errors: errorReducer,
  },
  preloadedState: initialState,
});

export default store;
