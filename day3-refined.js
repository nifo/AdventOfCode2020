const fs = require('fs')

let forestMap = fs.readFileSync('./input3.txt')
                  .toString()
                  .split('\n');

function travel(treeMap, slope) {
    let [right, down] = slope;
    const maxMapSize = treeMap[0].length;

    const rows = treeMap.filter((_, index) => index % down === 0);
    const path = rows.map((row, index) => row[index * right % maxMapSize]);
    return path
}

const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
]
const traveledSlopes = slopes.map(slope => travel(forestMap, slope));

function count(array, predicate) {
    return array.filter(predicate).length
}
const tree = '#';
const countedTrees = count(traveledSlopes, traveledSpace => traveledSpace === tree);
function product(acc, current) { return acc * current };
console.log(countedTrees.reduce(product, 1));