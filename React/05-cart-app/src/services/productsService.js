export const getProducts = async () => {

    const response = await fetch('http://localhost:8000/products');
    const products = await response.json();

    return products;
}

export const calcularTotal = (items) => {
    return items.reduce((accumulator, item) => accumulator + item.product.price * item.quantity, 0);
}