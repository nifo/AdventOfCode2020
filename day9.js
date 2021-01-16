const fs = require('fs')

const numbers = fs.readFileSync('./input9.txt')
                           .toString()
                           .split('\n')
                           .map(string => Number(string));

const PREAMBLE_LENGTH = 25
const preamble = [...numbers.splice(0, PREAMBLE_LENGTH)];

function valid(number) {
    const pairs = allPairs(preamble);
    for(let [a, b] of pairs) {
        if(a + b == number) {
            preamble.shift();
            preamble.push(number);
            return true
        }
    }
    return false;
}

function allPairs(iterable) {
    const pairs = new Set();
    for(let a of iterable) {
        for(let b of iterable) {
            pairs.add(new Set([a, b]))
        }
    }
    return pairs
}

console.log(allPairs([1, 2, 3]))
console.log(numbers.find(number => !valid(number)));
