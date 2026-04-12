const initialState = {
    isLoading: false,
    errorMessage: null,
    categoryIsLoading: false,
    categoryErrorMessage: null,
    buttonLoader: false
}

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case "IS_FETCHING":
            return {
                ...state,
                isLoading: true,
                errorMessage: null
            }
        case "IS_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errorMessage: null
            }
        case "IS_ERROR":
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload
            }
        case "CATEGORY_LOADER":
            return {
                ...state,
                categoryIsLoading: true,
                categoryErrorMessage: null
            }
        case "FETCH_CATEGORIES":
            return {
                ...state,
                categoryIsLoading: false,
                categoryErrorMessage: null
            }
        case "CATEGORY_SUCESS":
            return {
                ...state,
                categoryIsLoading: false,
                categoryErrorMessage: null
            }
        case "BUTTON_LOADER_TRUE":
            return {
                ...state,
                buttonLoader: true,
                errorMessage: null,
            }
        case "BUTTON_LOADER_FALSE":
            return {
                ...state,
                buttonLoader: false,
                errorMessage: null,
            }
        default:
            return state
    }
}