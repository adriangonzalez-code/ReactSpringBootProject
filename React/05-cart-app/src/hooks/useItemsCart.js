import { useEffect, useReducer } from "react";
import { itemsReducer } from "../reducer/itemsReducer.js";
import { AddProductCart, DeleteProductCart, UpdateProductCart } from "../reducer/itemsActions.js";

const initialCartItems = JSON.parse(sessionStorage.getItem('cart')) || [];

export const useItemsCart = () => {

    const [ cartItems, dispatch ] = useReducer(itemsReducer, initialCartItems);

    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const handlerAddProductCart = (product) => {
        const hastItem = cartItems.find((i) => i.product.id === product.id);

        if (hastItem) {
            dispatch({
                type: UpdateProductCart,
                payload: product
            });
        } else {
            dispatch({
                type: AddProductCart,
                payload: product
            });
        }
    };

    const handlerDeleteProductCart = (id) => {
        dispatch({
            type: DeleteProductCart,
            payload: id
        })
    };

    return {
        cartItems,
        handlerAddProductCart,
        handlerDeleteProductCart
    }
};