const initialState = {
    currentCurrency: 0
};

export const currencyReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "CURRENCY:SET_CURRENCY":
            return {
                ...state,
                currentCurrency: payload
            }
        default: return state;
    }
};