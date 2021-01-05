const fs = require('fs')

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