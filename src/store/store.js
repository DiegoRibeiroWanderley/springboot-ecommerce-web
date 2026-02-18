import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./reducers/productReducer";
import { errorReducer } from "./reducers/errorReducer";
import { categoryReducer } from "./reducers/categoryReducer";

const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoryReducer,
        errors: errorReducer
    },
    preloadedState: {}
})

export default store