import client from "../../apollo";
import CATEGORY_QUERY from "../../graphql/queries/category";

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
    }),
    setAllItemsData: data => ({
        type: "CART:CART_SET_ALL_ITEMS_DATA",
        payload: data
    }),
    setClothesData: data => ({
        type: "CART:CART_SET_CLOTHES_DATA",
        payload: data
    }),
    setTechData: data => ({
        type: "CART:CART_SET_TECH_DATA",
        payload: data
    }),
    fetchItems: input => dispatch => {
        client.query({
            query: CATEGORY_QUERY,
            variables: {
                input: {
                    title: input
                }
            }
        }).then(({ data }) => {
            if (input === "all") {
                dispatch(CartActions.setAllItemsData(data.category));
            }
            if (input === "clothes") {
                dispatch(CartActions.setClothesData(data.category));
            }
            if (input === "tech") {
                dispatch(CartActions.setTechData(data.category));
            }
        });
    }
};

export default CartActions;