const fs = require('fs');
const { Z_STREAM_END } = require('zlib');

const groups = fs.readFileSync('./input6.txt')
                 .toString()
                 .replace(/\n/g, ' ')
                 .split('  ')
                 .map(group => group.split(' '))


// [[personAnswer], [personAnswer, personAnswer]] 
// example [['abc'], ['a', 'bef', 'ca']]

const counts = groups.reduce((acc, group) => {
    const counter = new Set()
    for(let personAnswer of group) {
        for(let char of personAnswer) {
            counter.add(char);
        }
    }
    return acc + counter.size;
}, 0)
console.log(counts);

// Refined

// missing JS function
function setUnion(A, B) {
    return new Set([...A, ...B])
}

// const counts2 = groups.reduce((accGroup, group) => {
//     return accGroup + group.reduce((accPerson, person) => {
//         return setUnion(accPerson, new Set(...person));
//     }, new Set()).size;
// }, 0);
// console.log(counts2);
// const counts2 = groups.reduce((acc, group) => {
//     let counter = new Set()
//     for(let personAnswer of group) {
//         counter = setUnion(counter, new Set(...personAnswer));
//     }
//     return acc + counter.size;
// }, 0)
// console.log(counts2);
// /Refined 

function addDefaultArray(obj, key, value) {
    if(key in obj) obj[key] = obj[key].concat(value);
    else obj[key] = [value];
}

const countsSame = groups.reduce((acc, group, index) => {
    // {a-Z: [persons]}
    // example {c: [1, 2, 3]}
    const counter = {}
    for(let personAnswer of group) {
        for(let char of personAnswer) {
            addDefaultArray(counter, char, index);
        }
    }
    const totalPersons = group.length;
    const counted = Object.values(counter).filter((persons) => persons.length === totalPersons).length
    return acc + counted;
}, 0)
console.log(countsSame);