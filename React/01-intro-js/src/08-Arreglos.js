const products = [
    'Mesa',
    'Silla',
    'Notebook',
    'Teclado'
];

products.push('Pantalla LCD', 'Sony TV');

console.log(products);

products.forEach((el, i) => {
    console.log(`${i + 1} - ${el}`);
});

for (const prod of products) {
    console.log(prod);
}

for (let i = 0; i < products.length; i++) {
    const element = products[i];
    console.log(element);
}

console.log(products[4]);