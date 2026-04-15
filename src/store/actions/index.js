import api from "../../api/api";

export const fetchProducts = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });

    const { data } = await api.get(`/public/products?${queryString}`);
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });

    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch products",
    });
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_LOADER" });

    const { data } = await api.get(`/public/categories`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });

    dispatch({ type: "CATEGORY_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch category",
    });
  }
};

export const fetchCart = () => async (dispatch) => {
  try {
    const cart = await api.get("/carts/users/cart");
    dispatch({ type: "ADD_CART", payload: cart.data });
  } catch (error) {
    console.log(error);
  }
};

export const addToCart =
  (data, qty = 1, toast) =>
  async (dispatch, getState) => {
    const { products } = getState().products;
    const getProduct = products.find(
      (item) => item.productId === data.productId,
    );

    const isQuantityExist = getProduct.quantity >= qty;

    try {
      const response = await api.post(
        `/cart/products/${getProduct.productId}/quantity/${qty}`,
      );
      const updatedCart = response.data;

      if (isQuantityExist) {
        dispatch({ type: "ADD_CART", payload: updatedCart });
        toast.success(`${data?.productName} added to the cart`);
      } else {
        toast.error("Out of stock");
      }
    } catch (error) {
      console.log(error);
    }
  };

export const increaseCartQuantity = (data, toast) => async (dispatch) => {
  try {
    const updatedCart = await api.put(
      `/cart/products/${data.productId}/quantity/add`,
    );
    dispatch({ type: "ADD_CART", payload: updatedCart.data });
  } catch (error) {
    toast.error(error);
  }
};

export const decreaseCartQuantity = (data) => async (dispatch) => {
  try {
    const updatedCart = await api.put(
      `/cart/products/${data.productId}/quantity/delete`,
    );
    dispatch({ type: "ADD_CART", payload: updatedCart.data });
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = (data, toast) => async (dispatch, getState) => {
  const cartId = getState().carts.cart?.cartId;
  try {
    const updatedCart = await api.delete(
      `/carts/${cartId}/product/${data.productId}`,
    );
    dispatch({ type: "REMOVE_CART", payload: updatedCart.data });
    toast.success(`${data.productName} removed from cart`);
  } catch (error) {
    console.log(error);
  }
};

export const currentUser = () => async (dispatch) => {
  try {
    const { data } = await api.get("/auth/user");
    dispatch({ type: "LOGIN_USER", payload: data });
    localStorage.setItem("auth", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const authenticationSignInUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signin", sendData);
      dispatch({ type: "LOGIN_USER", payload: data });
      localStorage.setItem("auth", JSON.stringify(data));
      reset();
      toast.success("Login Success");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      dispatch(fetchCart());
      setLoader(false);
    }
  };

export const registerNewUser =
  (sendData, toast, reset, navigate, setLoader) => async () => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signup", sendData);
      reset();
      toast.success(data?.message || "User registered successfully");
      navigate("/Login");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      setLoader(false);
    }
  };

export const logoutUser = (navigate) => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
  await api.post("/auth/signout");
  localStorage.removeItem("auth");
  dispatch({ type: "ADD_CART", payload: null });
  navigate("/login");
};

export const addUpdateUserAddress =
  (sendData, toast, addressId, setOpenAddressModal) => async (dispatch) => {
    dispatch({ type: "BUTTON_LOADER" });
    try {
      if (addressId) {
        await api.put(`/addresses/${addressId}`, sendData);
      } else {
        await api.post("/addresses", sendData);
      }
      dispatch(getUserAddresses());
      toast.success("Address registered successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
      dispatch({ type: "IS_ERROR", payload: null });
    } finally {
      dispatch({ type: "IS_SUCCESS" });
      setOpenAddressModal(false);
    }
  };

export const getUserAddresses = () => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });

    const { data } = await api.get(`/addresses`);
    dispatch({ type: "USER_ADDRESSES", payload: data });

    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch user addresses",
    });
  }
};

export const selectUserCheckoutAddress = (address) => {
  return {
    type: "SELECT_CHECKOUT_ADDRESS",
    payload: address,
  };
};

export const deleteUserAddress =
  (toast, addressId, setOpenDeleteModal) => async (dispatch) => {
    try {
      dispatch({ type: "BUTTON_LOADER " });
      await api.delete(`/addresses/${addressId}`);
    } catch (error) {
      dispatch({ type: "IS_ERROR", payload: error?.response?.data?.message });
    } finally {
      dispatch({ type: "IS_SUCCESS" });
      dispatch(getUserAddresses());
      toast.success("Address removed successfully");
      setOpenDeleteModal(false);
      dispatch({ type: "SELECT_CHECKOUT_ADDRESS" });
    }
  };
