const papper = {
    product: 'papper',
    price: 100,
    quantity: 10
};

const invoices = [
    {
        id: 1,
        name: 'Compras de oficina',
        client: {
            name: 'John',
            lastName: 'Doe',
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
            papper
        ]
    },
    {
        id: 2,
        name: 'Compras de computación',
        client: {
            name: 'Pepe',
            lastName: 'Doe'
        },
        item: [
            {
                product: 'keyboard',
                price: 399,
                quantity: 2
            },
            {
                product: 'screen 17',
                price: 800,
                quantity: 1
            },
            {
                product: 'cpu',
                price: 1000,
                quantity: 10
            }
        ]
    },
    {
        id: 3,
        name: 'Compras papeleria',
        client: {
            name: 'Maria',
            lastName: 'Juana'
        },
        item: [
            {
                product: 'pencil',
                price: 50,
                quantity: 1
            },
            papper
        ]
    }
];

const invoiceByClientName = (clientName) => {
    return invoices.find(i => i.client.name === clientName);
}

export {
    papper,
    invoices,
    invoiceByClientName as default
}
