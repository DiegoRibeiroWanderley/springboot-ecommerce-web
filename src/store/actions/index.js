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
    async (dispatch, getState) => {
        const { products } = getState().products;
        const getProduct = products.find((item) => (item.productId === data.productId))

        const isQuantityExist = getProduct.quantity >= qty

        try {
            const response = await api.post(`/cart/products/${getProduct.productId}/quantity/${qty}`)
            const updatedCart = response.data

            if (isQuantityExist) {
                dispatch({type: "ADD_CART", payload: updatedCart })
                toast.success(`${data?.productName} added to the cart`)
            } else {
                toast.error("Out of stock")
            }
        } catch (error) {
            console.log(error);
            
        }
    }

export const increaseCartQuantity = (data, toast) => 
    async (dispatch, getState) => {
        const cartItems = getState().carts.cart?.products;
        const getProduct = cartItems.find((item) => (item.productId === data.productId))

        try {
            const updatedCart = await api.put(`/cart/products/${data.productId}/quantity/add`)
            dispatch({type: "ADD_CART", payload: updatedCart.data })
        } catch (error) {
            toast.error("Quantity reached to limit")
        }
    }

export const decreaseCartQuantity = (data) => 
    async (dispatch, getState) => {
        try {
            const updatedCart = await api.put(`/cart/products/${data.productId}/quantity/delete`)
            dispatch({type: "ADD_CART", payload: updatedCart.data})
        } catch (error) {
            console.log("Error")
        }
    }

export const removeFromCart = (data, toast) => 
    async (dispatch, getState) => {
        const cartId = getState().carts.cart?.cartId
        try {
            const updatedCart = await api.delete(`/carts/${cartId}/product/${data.productId}`)
            dispatch({type: "REMOVE_CART", payload: updatedCart.data })
            toast.success(`${data.productName} removed from cart`)
        } catch (error) {
            console.log("Error");
        }
    }

export const currentUser = () =>
    async (dispatch) => {
        try {
            const { data } = await api.get("/auth/user")
            dispatch({ type: "LOGIN_USER", payload: data})
            localStorage.setItem("auth", JSON.stringify(data))
        } catch (error) {
            console.log(error);
        }
    }

export const authenticationSignInUser = (sendData, toast, reset, navigate, setLoader) =>
    async (dispatch) => {
    try {
        setLoader(true)
        const { data } = await api.post("/auth/signin", sendData)
        dispatch({ type: "LOGIN_USER", payload: data })
        localStorage.setItem("auth", JSON.stringify(data))
        reset()
        toast.success("Login Sucess")
        navigate("/")
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Internal Server Error")
    } finally {
        setLoader(false)
    }
}