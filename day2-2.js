const fs = require('fs')

let inputData = fs.readFileSync('./input2.txt')
                       .toString()
                       .split('\n');


// [ '1-3', 'b:', 'cdefg' ]
let passwords = inputData.map((line) => {
    const [requiredCount, requiredChar, password] = line.split(' ');
    return [
        ...removeDash(requiredCount), // 1, 3
        requiredChar.slice(0, -1), //removes last ':'
        password]
});

function removeDash(dashedString) {
    return dashedString.split('-').map((s) => Number(s))
}

function xor(bool1, bool2) {
    if(bool1 && bool2) return false;
    if(bool1 && !bool2) return true;
    if(!bool1 && bool2) return true;
    return false
    
}

function validPassword([firstIndex, secondIndex, char, password]) {
    let firstChar = password.slice(firstIndex - 1, firstIndex);
    let secondChar = password.slice(secondIndex - 1, secondIndex);
    return xor(firstChar === char, secondChar === char)
}

console.log(
    passwords.filter(validPassword).length
);