const fs = require('fs')

const numbers = fs.readFileSync('./input9.txt')
                           .toString()
                           .split('\n')
                           .map(string => Number(string));

const PREAMBLE_LENGTH = 5
// const preamble = [...numbers.splice(0, PREAMBLE_LENGTH)];

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

// console.log(numbers.find(number => !valid(number))); //25918798

function contiguousSet(numbers, matching) {
    let found;
    numbers.forEach((n, i) => {
        if(found) return;
        let cont = [];
        let sum =0;
        let index = i;

        while(sum < matching) {
            cont.push(numbers[index]);
            sum += numbers[index]
            if(sum === matching) {
                found = cont;
            }
            index++;
        }
    });
    return found;
}

function contiguousSet2(numbers, matching) {
    let cont = [];
    let sum = 0;
    while(sum !== matching) {
        if(sum < matching) cont.push(numbers.shift())
        if(sum > matching) cont.shift();
        sum = cont.reduce((acc, curr) => acc + curr, 0)
    }
    return cont
}

const contSet = contiguousSet2(numbers, 25918798).sort((a, b) => a - b);
const sortedContSet = contSet.sort((a, b) => a - b);
console.log(sortedContSet[0] + sortedContSet[sortedContSet.length - 1]); //3340942