const fs = require('fs')

let startLayout = fs.readFileSync('./input11.txt')
                    .toString()
                    .split('\n');

const FLOOR = '.'
const EMPTY = 'L'
const OCCUPIED = '#'

function adjacent(i, j, layout) {
    return [
        layout?.[i+1]?.[j], //right
        layout?.[i-1]?.[j], //left
        layout?.[i]?.[j+1], //down
        layout?.[i]?.[j-1], //up
        layout?.[i+1]?.[j+1], //down-right
        layout?.[i-1]?.[j+1], //down-left
        layout?.[i+1]?.[j-1], //up-right
        layout?.[i-1]?.[j-1], //up-left
    ].filter(x => x)
}

function rules(i, j, layout) {
    const current = layout[i][j];
    const adjacents = adjacent(i, j, layout);
    if (current === FLOOR) {
        return FLOOR;
    }
    if (current === EMPTY && adjacents.every(seat => seat != OCCUPIED)) {
        return OCCUPIED;
    }
    if (current === OCCUPIED && adjacents.filter(seat => seat === OCCUPIED).length >= 4) {
        return EMPTY;
    }
    return current;
}

// let testLayout1 = [
//     ['.', '.', '.', '.', '.', '.', '.', '#', '.', ],
//     ['.', '.', '.', '#', '.', '.', '.', '.', '.', ],
//     ['.', '#', '.', '.', '.', '.', '.', '.', '.', ],
//     ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
//     ['.', '.', '#', 'L', '.', '.', '.', '.', '#', ],
//     ['.', '.', '.', '.', '#', '.', '.', '.', '.', ],
//     ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
//     ['#', '.', '.', '.', '.', '.', '.', '.', '.', ],
//     ['.', '.', '.', '#', '.', '.', '.', '.', '.', ],
// ];

// testLayout2 = [
//     ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', ],
//     ['.', 'L', '.', 'L', '.', '#', '.', '#', '.', '#', '.', '#', '.', ],
//     ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', ],
// ];

// testLayout3 =  [
//     ['.', '#', '#', '.', '#', '#', '.', ],
//     ['#', '.', '#', '.', '#', '.', '#', ],
//     ['#', '#', '.', '.', '.', '#', '#', ],
//     ['.', '.', '.', 'L', '.', '.', '.', ],
//     ['#', '#', '.', '.', '.', '#', '#', ],
//     ['#', '.', '#', '.', '#', '.', '#', ],
//     ['.', '#', '#', '.', '#', '#', '.', ],
// ]
//console.log(lookFar(3, 4, testLayout1))
//console.log(lookFar(1, 1, testLayout2))
//console.log(lookFar(3, 3, testLayout3))

function lookFar(i, j, layout) {
    const left = ((j) => { 
        while (j >= 0) { 
            if(layout[i][j] === OCCUPIED) return 1
            if(layout[i][j] === EMPTY) return 0
            j--;
        }
        return 0
    })(j - 1)
    const right = ((j) => { 
        while (j < layout[i].length) { 
            if(layout[i][j] === OCCUPIED) return 1
            if(layout[i][j] === EMPTY) return 0
            j++;
        }
        return 0
    })(j + 1);
    const up = ((i) => { 
        while (i >= 0) { 
            if(layout[i][j] === OCCUPIED) return 1
            if(layout[i][j] === EMPTY) return 0
            i--;
        }
        return 0
    })(i - 1);
    const down = ((i) => { 
        while (i < layout.length) { 
            if(layout[i][j] === OCCUPIED) return 1
            if(layout[i][j] === EMPTY) return 0
            i++;
        }
        return 0
    })(i + 1);
    const upLeft = ((i, j) => { 
        while (i >= 0 && j >= 0) { 
            if(layout[i][j] === OCCUPIED) return 1
            if(layout[i][j] === EMPTY) return 0
            i--;
            j--;
        }
        return 0
    })(i - 1, j - 1);
    const upRight = ((i, j) => { 
        while (i >= 0 && j < layout[i].length) { 
            if(layout[i][j] === OCCUPIED) return 1
            if(layout[i][j] === EMPTY) return 0
            i--;
            j++;
        }
        return 0
    })(i - 1, j + 1);
    const downLeft = ((i, j) => { 
        while (i < layout.length && j >= 0) { 
            if(layout[i][j] === OCCUPIED) return 1
            if(layout[i][j] === EMPTY) return 0
            i++;
            j--;
        }
        return 0
    })(i + 1, j - 1);
    const downRight = ((i, j) => { 
        while (i < layout.length && j <= layout[i].length) { 
            if(layout[i][j] === OCCUPIED) return 1
            if(layout[i][j] === EMPTY) return 0
            i++;
            j++;
        }
        return 0
    })(i + 1, j + 1)
    return [left, right, up, down, upLeft, upRight, downLeft, downRight].reduce((acc, curr) => acc + curr);
}

// console.log(lookFar(1, 1, testLayout));

const rulesTwoStar = (i, j, layout) => {
    const current = layout[i][j];
    const seats = lookFar(i, j, layout);
    if (current === FLOOR) {
        return FLOOR;
    }
    if (current === EMPTY && seats === 0) {
        return OCCUPIED;
    }
    if (current === OCCUPIED && seats >= 5) {
        return EMPTY;
    }
    return current;
}

const height = startLayout.length;
const width = startLayout[0].length;
function emptyLayout(width, height) {
    const result = [];
    for (let i = 0; i < height; i++) {
        result.push([]);
        for (let j = 0; j < width; j++) {
            result[i].push([]);
        }
    }
    return result;
}

let layout = startLayout.map(r => r.split(''));
while (true) {
    let nextLayout = emptyLayout(width, height);
    let stable = true
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let newState = rulesTwoStar(i, j, layout);
            if (newState != layout[i][j]) stable = false;
            nextLayout[i][j] = newState;
        }
    }
    layout = nextLayout;
    if (stable) break;
}

let occupiedSeats = 0;
for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        if(layout[i][j] === OCCUPIED) occupiedSeats++;
    }
}
console.log(occupiedSeats);