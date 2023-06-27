import invoiceByClientName, { invoices, papper } from './data/invoices';

const invoicesName = invoices.map(i => i.name);
console.log(invoicesName);
console.log(invoices);

const invoicesClient = invoices.map(i => {
    return i.client.name;
});

console.log(invoicesClient);

// const invoiceById = invoices.find(i => i.client.name === 'Pepe');
console.log('Buscar por nombre de cliente');
console.log(invoiceByClientName('Maria'));

const invoiceFilter = invoices.filter(i => i.id > 1);
console.log(invoiceFilter);

console.log('Filter eliminar');
const invoiceDeleted = invoices.filter(i => i.id !== 2);
console.log(invoiceDeleted);

const invoiceFilter2 = invoices.filter(i => i.item.includes(papper));
console.log(invoiceFilter2);

const result = invoices.some(i => i.client.name === 'Pepe');
console.log(result);