import { products } from "../data/products.js";

export const getProducts = () => {
    return products;
}

export const calcularTotal = (items) => {
    return items.reduce((accumulator, item) => accumulator + item.product.price * item.quantity, 0);
}