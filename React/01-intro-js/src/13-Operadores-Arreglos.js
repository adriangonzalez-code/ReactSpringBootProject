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

const invoicesName = invoices.map(i => {
    return i.name;
});

console.log(invoicesName);
console.log(invoices);

const invoicesClient = invoices.map(i => {
    return i.client.name;
});

console.log(invoicesClient);

const invoiceById = invoices.find(i => i.name === 'Compras de oficina');
console.log(invoiceById);

const invoiceFilter = invoices.filter(i => i.id > 1);
console.log(invoiceFilter);

console.log('Filter eliminar');
const invoiceDeleted = invoices.filter(i => i.id !== 2);
console.log(invoiceDeleted);

const invoiceFilter2 = invoices.filter(i => i.item.includes(papper));
console.log(invoiceFilter2);

const result = invoices.some(i => i.client.name === 'Pepe');
console.log(result);