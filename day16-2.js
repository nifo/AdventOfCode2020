const fs = require('fs')
// class: 0-1 or 4-19
// row: 0-5 or 8-19
// seat: 0-13 or 16-19

// your ticket:
// 11,12,13

// nearby tickets:
// 3,9,18
// 15,1,5
// 5,14,9

const inputData = fs.readFileSync('./input16.txt')
                       .toString()
                       .split('\n')
                       .filter((x) => x)
const ticketData = inputData

const myTicket = [];
const nearbyTickets = [];

function ticketStringToArray(ticket) {
    return ticket.split(',').map(n => Number(n))
}

let ticket;
while(ticket = ticketData.pop()) {
    if(ticket === 'nearby tickets:') break;
    nearbyTickets.push(ticketStringToArray(ticket));
}

while(ticket = ticketData.pop()) {
    if(ticket === 'your ticket:') break;
    myTicket.push(ticketStringToArray(ticket));
}

function range(low, high) {
    let range = [];
    for(i = low; i <= high; i++) {
        range.push(i);
    }
    return range
}

const fields = {};
let field
while(field = ticketData.pop()) {
    let [name, ranges] = field.split(':');
    let numbers = [...ranges.match(/(\d+)/g)].map(n => Number(n))
    let [low1, hi1, low2, hi2] = numbers;
    let expandedRanges = range(low1, hi1).concat(range(low2, hi2));
    fields[name] = expandedRanges;
}

const a = myTicket.map((n) => {
    for(let [key, value] of Object.entries(fields)){
        if(value.includes(n)) return key
    }
});

console.log(a);

