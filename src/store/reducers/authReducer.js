const initialState = {
  user: null,
  addresses: [],
  selectedUserAddress: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, user: action.payload };
    case "LOG_OUT":
      return {
        user: null,
        address: null,
      };
    case "USER_ADDRESSES":
      return {
        ...state,
        addresses: action.payload,
      };
    case "SELECT_CHECKOUT_ADDRESS":
      return {
        ...state,
        selectedUserAddress: action.payload,
      };
    case "REMOVE_CHECKOUT_ADDRESS":
      return { ...state, selectedUserAddress: null };
    default:
      return state;
  }
};
