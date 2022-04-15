const CartActions = {
    cartIncrementItems: () => ({
        type: "CART:CART_INCREMENT_ITEMS"
    }),
    cartDecrementItems: () => ({
        type: "CART:CART_DECREMENT_ITEMS"
    }),
    setCartData: data => ({
        type: "CART:CART_SET_DATA",
        payload: data
    }),
    setCartFiltredData: data => ({
        type: "CART:CART_SET_FILTRED_DATA",
        payload: data
    })
};

export default CartActions;