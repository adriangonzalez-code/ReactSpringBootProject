const products = [
    'Mesa',
    'Silla',
    'Notebook',
    'Teclado'
];

const products2 = products.concat('Pantalla LCD', 'Sony TV');

const fruits = ['Peras', 'Manzanas', 'Sandias', 'Frutillas'];

const market = [...products2, ...fruits, 'Lechuga', 'Papa', 'Uvas'];
const market2 = products2.concat(fruits).concat('Lechuga', 'Papa', 'Uvas');

console.log(products);
console.log(market);
console.log(market2);