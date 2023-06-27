const users = ['pepe', 'ana', 'maria', 'juan', 'sebastian', 'carlos', 'josefa'];

const [pepe, b, maria, ...rest] = users;

console.log(pepe, b, maria, ...rest);