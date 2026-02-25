import api from "../../api/api";

export const fetchProcuts = (queryString) => async (dispatch) => {
    try {
        dispatch({type: "IS_FETCHING"})

        const {data} = await api.get(`/public/products?${queryString}`)
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElemets: data.totalElemets,
            totalPages: data.totalPages,
            lastPage: data.lastPage
        })

        dispatch({type: "IS_SUCCESS"})
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fecth products"
        })
    }
}

export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({type: "CATEGORY_LOADER"})

        const {data} = await api.get(`/public/categories`)
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElemets: data.totalElemets,
            totalPages: data.totalPages,
            lastPage: data.lastPage
        })

        dispatch({type: "CATEGORY_SUCCESS"})
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fecth category"
        })
    }
}

export const addToCart = (data, qty = 1, toast) => 
    (dispatch, getState) => {
        const { products } = getState().products;
        const getProduct = products.find((item) => (item.productId === data.productId))

        console.log(getProduct)

        const isQuantityExist = getProduct.quantity >= qty

        if (isQuantityExist) {
            dispatch({type: "ADD_CART", payload: {...data, quantity: qty}})
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart))
            toast.success(`${data?.productName} added to the cart`)
        } else {
            toast.error("Out of stock")
        }
    }