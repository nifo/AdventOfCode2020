const fs = require('fs')

const instructionsData = fs.readFileSync('./input8.txt')
                           .toString()
                           .split('\n')
// nop +0
// acc -1
// jmp +4
                           

const instructions = instructionsData.map(instruction => {
    const [isntr, value ] = instruction.split(' ');
    return [isntr, Number(value)];
})                           
// example:
// [nop, 0]
// [acc, -1]
// [jmp, 4]


function run(instructions) {
    let globalAcc = 0;
    const executedInstructionsIndex = [];
    let i = 0;
    while(true) {
        if(i >= instructions.length) return globalAcc
        if(executedInstructionsIndex.includes(i)) return false;

        const [instruction, value] = instructions[i];
        executedInstructionsIndex.push(i);
        if(instruction === 'nop') { i++ };
        if(instruction === 'acc') { globalAcc += value; i++ }
        if(instruction === 'jmp') { i += value }
    }
}

console.log(run(instructions));

// return a copy of array with element atIndex replaced by element  
function replaced(array, atIndex, element   ) {
    const _array = [...array]
    _array[atIndex] = element
    return _array
}

const allInstructions = []
instructions.forEach(([instruction, value], i, array) => {
    if(instruction === 'acc') return;
    if(instruction === 'nop') return allInstructions.push(replaced(array, i, ['jmp', value]));
    if(instruction === 'jmp') return allInstructions.push(replaced(array, i, ['nop', value]));
});


const allCorrected = allInstructions.map((instructions) => run(instructions));
console.log(allCorrected);

const correct = allInstructions.find((instructions) => Boolean(run(instructions)));
console.log(correct);
console.log(run(correct));