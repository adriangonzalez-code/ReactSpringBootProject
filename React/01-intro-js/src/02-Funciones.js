function sayHello(name = 'Pepe', age = 0) {
    const greeting = `Hola mundo function! ${name} edad ${age}`;

    // console.log('Hola mundo function!');
    return greeting;
}

const result = sayHello('Adrián', 10);

console.log(result);