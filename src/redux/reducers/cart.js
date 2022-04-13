const initialState = {
    countItems: 0,
    data: []
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
                data: [...state.data, payload]
            }
        default: return state;
    }
};