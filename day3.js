const fs = require('fs')

let forestMap = fs.readFileSync('./input3.txt')
                       .toString()
                       .split('\n');


function travel(treeMap, slope){
    let [right, down] = slope;
    let [posRight, posDown] = [0, down];
    
    const mapSize = treeMap[0].length;
    
    const path = []
    for(const row of treeMap) {
        if(posDown === 0) {
            posDown = down - 1;
            posRight = (posRight + right) % mapSize;
            path.push(row[posRight]);
        } else {
            posDown = posDown - 1;
        }
    }
    return path
}


function count(array, predicate) {
    return array.filter(predicate).length
}

const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
]

const tree = '#';
const traveledSlopes = slopes.map(slope => {
    return count(travel(forestMap, slope), traveledSpace => traveledSpace === tree)
})

console.log(traveledSlopes);


function product(acc, current) { return acc * current };
console.log(traveledSlopes.reduce(product, 1));