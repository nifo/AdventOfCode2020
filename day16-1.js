const fs = require('fs')

let inputData = fs.readFileSync('./input16.txt')
                       .toString()
                       .split('\n')
let ticketData = inputData

let fields = [];
let myTicket = [];
let nearbyTickets = [];

let line = ticketData.pop();
while(line !== 'nearby tickets:') {
    nearbyTickets.push(line);
    line = ticketData.pop();
}
nearbyTickets = nearbyTickets.map((ticket) => ticket.split(',').map(n => Number(n)))

line = ticketData.pop();
line = ticketData.pop();
while(line !== 'your ticket:') {
    myTicket.push(line);
    line = ticketData.pop();
}
myTicket = myTicket.map((ticket) => ticket
    .split(',')
    .map(n => Number(n))
)
line = ticketData.pop();

fields = ticketData.map((field) => {
    let numbers = [...field.match(/(\d+)/g)]
        .map((n) => Number(n));
    let [low1, hi1, low2, hi2] = numbers;
    return range(low1, hi1).concat(range(low2, hi2));
})


function range(low, high) {
    let range = [];
    for(i = low; i <= high; i++) {
        range.push(i);
    }
    return range
}

//

console.log(fields, myTicket, nearbyTickets)
let allFields = fields.flat()
let ticketErrorScanning = []
for(ticket of nearbyTickets) {
    for(number of ticket) {
        if(!allFields.includes(number)) {
            ticketErrorScanning.push(number);
        }
    }
}
console.log(ticketErrorScanning)
function sum(acc, curr) { return acc + curr }
console.log(ticketErrorScanning.reduce(sum));


