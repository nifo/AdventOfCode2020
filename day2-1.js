const fs = require('fs')

let inputData = fs.readFileSync('./input2.txt')
                       .toString()
                       .split('\n');


// [ '1-3', 'b:', 'cdefg' ]
let passwords = inputData.map((line) => {
    const [requiredCount, requiredChar, password] = line.split(' ');
    return [
        range(...removeDash(requiredCount)),
        requiredChar.slice(0, -1), //removes last ':'
        password]
});

function removeDash(dashedString) {
    return dashedString.split('-').map((s) => Number(s))
}

function range(low, high) {
    let range = [];
    for(i = low; i <= high; i++) {
        range.push(i);
    }
    return range
}

function countCharsInString(char, string) {
    return count([...string.matchAll(char)])
}

function validPassword([requiredCountRange, char, password]) {
    return requiredCountRange.includes(countCharsInString(char, password))
}

function count(array) {
    return array.length
}

console.log(
    count(passwords.filter(validPassword))
);