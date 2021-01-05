const fs = require('fs')

const boardingpassData = fs.readFileSync('./input5.txt')
                           .toString()
                           .split('\n')

// Always 7 Front Back, 3 Right Left
// example: BFFFBBFRRR

function replaceCharToBinary(text, charToZero, charToOne) {
    const toZero = new RegExp(charToZero, 'g');
    const toOne = new RegExp(charToOne, 'g');
    text = text.replace(toZero, '0');
    text = text.replace(toOne, '1')
    return text
}

const boardingPass = boardingpassData.map(data => {
    const [rowInstruction, columnInstruction] = [data.slice(0, 7), data.slice(7)]
    const binaryRow = replaceCharToBinary(rowInstruction, 'F', 'B');
    const binaryColumn = replaceCharToBinary(columnInstruction, 'L', 'R');
    return [Number('0b' + binaryRow), Number('0b' + binaryColumn)];
});

const boardingPassIds = boardingPass.map(([row, column]) => { return (row * 8) + column })
boardingPassIds.sort((a, b) => a - b)
console.log(boardingPassIds.slice(-1));

function range(from, to) {
    const result = [];
    for(i = from; i <= to; i++) {
        result.push(i);
    }
    return result
}

const [firstId, lastId] = [boardingPassIds[0], boardingPassIds.slice(-1)[0]]
range(firstId, lastId).forEach((candidateId) => {
    if(!boardingPassIds.includes(candidateId) &&
        boardingPassIds.includes(candidateId - 1) && 
        boardingPassIds.includes(candidateId + 1)) {
        console.log('My ID ' + candidateId);
    }
})
