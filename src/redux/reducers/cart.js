const initialState = {
    countItems: 0,
    data: [],
    allItemsData: [],
    clothesData: [],
    techData: []
};

export const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "CART:CART_INCREMENT_ITEMS":
            return {
                ...state,
                countItems: state.countItems + 1
            }
        case "CART:CART_DECREMENT_ITEMS":
            return {
                ...state,
                countItems: state.countItems - 1
            }
        case "CART:CART_SET_DATA":
            return {
                ...state,
                data: [
                    ...state.data,
                    payload
                ],
            }
        case "CART:CART_SET_FILTRED_DATA":
            return {
                ...state,
                data: payload
            }
        case "CART:CART_SET_ALL_ITEMS_DATA":
            return {
                ...state,
                allItemsData: payload
            }
        case "CART:CART_SET_CLOTHES_DATA":
            return {
                ...state,
                clothesData: payload
            }
        case "CART:CART_SET_TECH_DATA":
            return {
                ...state,
                techData: payload
            }
        default: return state;
    }
};