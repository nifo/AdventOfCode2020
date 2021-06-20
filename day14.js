const fs = require('fs')

const instructions = fs.readFileSync('./input14.txt')
                .toString()
                .split('\n');


const zip = (A, B) => {
  const result = [];
  for(let i = 0; i < (Math.min(A.length, B.length)); i++) {
    result.push([A[i], B[i]]);
  }
  return result;
}


const memory = {};
let mask = ''

const update = ({ memoryAdress, value }) => {
  const binary = Number(value).toString(2).padStart(36, '0');
  const masked = zip(binary, mask)
    .map(([b, m]) => {
      if(m === 'X') return b;
      if(m === '0') return '0';
      if(m === '1') return '1';
  }).join('');
  const decimal = Number('0b' + masked);
  memory[memoryAdress] = decimal;
}

for(const instruction of instructions) {
  if (instruction.startsWith('mask')) {
    mask = instruction.slice(7); // remove 'mask = '
  }
  if (instruction.startsWith('mem')) {
    const [memoryAdress, value] = instruction.match(/\d+/g).map(Number);
    update({ memoryAdress, value })
  }
}

console.log('memory', memory);

const sum = (acc, curr) => acc + curr;
console.log('sum', Object.values(memory).reduce(sum, 0));
