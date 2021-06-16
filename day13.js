const fs = require('fs')
// 939
// 7,13,x,x,59,x,31,19
const [earliestDep, bussesInformation] = fs.readFileSync('./input13.txt')
                      .toString()
                      .split('\n');
const earliestDeparture = Number(earliestDep)
const busses = bussesInformation
  .split(',')
  .map(bus => {
    if (bus === 'x') return;
    return Number(bus);
  });

const earliestBus = ({ now }) => {
  while (true) {
    const bus = busses.find((bus) => now % bus == 0)
    if (bus) {
      return {
        time: now,
        busNumber: bus,
      };
    }
    now = now + 1;
  }  
};

const { time, busNumber} = earliestBus({ now: earliestDeparture })
const waited = time - earliestDeparture;
console.log(waited * busNumber)

