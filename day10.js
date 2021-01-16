const fs = require('fs')

const adapters = fs.readFileSync('./input10.txt')
                    .toString()
                    .split('\n')
                    .map(string => Number(string));


// Returns each element paired with the next element
// example conseqPairs([1, 2, 3, 4]) gives [[1, 2], [2, 3], [3, 4]]
function conseqPairs(iterable) {
    let result = [];
    for(let i = 0; i < iterable.length - 1; i++) {
        result.push([iterable[i], iterable[i + 1]]);
    }
    return result
}

const sortedAdapters = adapters.sort((a, b) => a - b);
const connectedAdapter = [0, ...sortedAdapters, (sortedAdapters[sortedAdapters.length - 1] + 3)]

const pairs = conseqPairs(connectedAdapter);

const oneJoltDifference = pairs.filter(([a, b]) => (b - a) === 1).length;
const threeJoltDifference = pairs.filter(([a, b]) => (b - a) === 3).length;
console.log(oneJoltDifference * threeJoltDifference);

