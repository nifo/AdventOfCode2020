const fs = require('fs')

const passportData = fs.readFileSync('./input4.txt')
                     .toString()
                     .replace(/\n/g, ' ')
                     .split('  ')

// eecl:gry pid:8600 eyr:2020
                
const passportObjects = passportData.map((data) => {
    return Object.fromEntries(
        data.split(' ').map((pair) => pair.split(':'))
    );
})

function numberBetween(number, atLeast, atMost) {
    const _number = Number(number);
    return (_number >= atLeast && _number <= atMost)
}

function byr(birthYear) {
    return (birthYear.length === 4 && numberBetween(birthYear, 1920, 2002));
}

function iyr(issueYear) {
    return (issueYear.length === 4 && numberBetween(issueYear, 2010, 2020));
}

function eyr(expirationYear) {
    return (expirationYear.length === 4 && numberBetween(expirationYear, 2020, 2030));
}

function hgt(height) {
    if (!height.match(/(\d+)(cm|in)/)) return false
    const [_fullMatch, value, unit] = height.match(/(\d+)(cm|in)/)
    if(unit === 'cm') return numberBetween(value, 150, 193);
    if(unit === 'in') return numberBetween(value, 59, 76);
    return false;
}

function hcl(haircolor) {
    return haircolor.length === 7 && haircolor.match(/#[0-9a-f]+/g)
}

function ecl(eyeColor) {
    return ['amb','blu','brn','gry','grn','hzl','oth'].includes(eyeColor);
}

function pid(passportId) {
    return passportId.length === 9
}

function valid(passport) {
    const requiredFields = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];
    const passportFields = Object.keys(passport);
    const allPresent = requiredFields.every(reuiredField => passportFields.includes(reuiredField));
    return (allPresent && 
            byr(passport['byr']) && 
            iyr(passport['iyr']) &&
            eyr(passport['eyr']) &&
            hgt(passport['hgt']) &&
            hcl(passport['hcl']) &&
            ecl(passport['ecl']) &&
            pid(passport['pid'])
        )

}


console.log(passportObjects.filter(valid).length);