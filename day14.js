const fs = require('fs')

const instructions = fs.readFileSync('./input14.txt')
                .toString()
                .split('\n');

const memory1 = {};
const memory2 = {};
let mask = '';

const applyMask = (value) => {
  const binary = Number(value).toString(2).padStart(36, '0');
  const masked = [...mask].map((m, i) => {
    if (m === '0') return m;
    if (m === '1') return m;
    if (m === 'X') return binary[i];
  }).join('');
  return Number('0b' + masked);
}

const floating = (text, parsed = '') => {
  const [char, ...unparsed] = text;
  if (char === undefined) return parsed;
  if (char === '1' || char === '0') return floating(unparsed, parsed + char);
  if (char === 'X') {
    return floating(unparsed, parsed + '0') + ':' + floating(unparsed, parsed + '1');
  }
}

const adressMask = (memoryAdress) => {
  const binary = Number(memoryAdress).toString(2).padStart(36, '0');
  const simpleMask = [...mask].map((m, i) => {
    if(m === '0') return binary[i];
    if(m === '1') return m;
    if(m === 'X') return m; 
  });
  const addressesHandledFloating = floating(simpleMask)
    .split(':')
    .map(address => Number('0b' + address));
  return addressesHandledFloating;
}

for(const instruction of instructions) {
  if (instruction.startsWith('mask')) {
    mask = instruction.slice(7); // remove 'mask = '
  }
  if (instruction.startsWith('mem')) {
    const [memoryAdress, value] = instruction.match(/\d+/g).map(Number);

    memory1[memoryAdress] = applyMask(value);

    for(const adress of adressMask(memoryAdress)) {
      memory2[adress] = value;
    }
  }
}

const sum = (acc, curr) => acc + curr;
console.log('sum 1', Object.values(memory1).reduce(sum, 0));
console.log('sum 2', Object.values(memory2).reduce(sum, 0));
