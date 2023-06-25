/*const sayHello = (name = 'Pepe', age = 0) => {
    const greeting = `Hola mundo function! ${name} edad ${age}`;

    // console.log('Hola mundo function!');
    return greeting;
}*/

/*const sayHello = function (name = 'Pepe', age = 0) {
    return `Hola mundo function! ${name} edad ${age}`;
}*/

/*const sayHello = (name = 'Pepe', age = 0) => {
    return `Hola mundo function! ${name} edad ${age}`;
}*/

const sayHello = (name = 'Pepe', age = 0) => `Hola mundo function! ${name} edad ${age}`;
const add = (a = 0, b = 0) => a + b;

const result = sayHello('Adrián', 10);

console.log(result);
console.log(add(10, 5));