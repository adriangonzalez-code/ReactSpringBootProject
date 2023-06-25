const invoice = {
    id: 10,
    name: 'Compras de oficina',
    date: new Date(),
    client : {
        id: 2,
        name: 'John',
        lastName : 'Doe',
        age: 20
    },
    total: function () {
        let total = 0;
        this.item.forEach(item => {
            total = total + (item.price * item.quantity);
        });

        return total;
    },
    greeting: () => {
        return `Hola ${invoice.client.name}`;
    },
    item: [
        {
            product: 'keyboard',
            price: 399,
            quantity: 2
        },
        {
            product: 'mouse',
            price: 200,
            quantity: 1
        },
        {
            product: 'papel',
            price: 100,
            quantity: 10
        }
    ]
};

// invoice.client.name = 'Pepe';

console.log(invoice);

const greeting = invoice.greeting();

console.log(greeting);
console.log('Total: ' + invoice.total());