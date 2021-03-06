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

let layout = startLayout;
while (true) {
    let nextLayout = emptyLayout(width, height);
    let stable = true
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let newState = rules(i, j, layout);
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