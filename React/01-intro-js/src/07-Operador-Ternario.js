const average = 4.9;

let status = '';

status = (average >= 5.5) ? 'Aprobado' : 'Rechazado';

if (average >= 5.5) {
    status = 'Aprobado';
} else {
    status = 'Rechazado';
}

console.log(`Resultado: ${status}`);

let max = 0;

const a = 5;
const b = 8;
const c = 12;

max = a > b ? a : b;
max = max > c ? max : c;

console.log(`El número mayor es ${max}`);