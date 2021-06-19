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
    return Number(bus) || bus;
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

const { waitingTime, busNumber} = earliestBus({ now: earliestDeparture })
const waited = waitingTime - earliestDeparture;
// console.log(waitingTime * busNumber);

// Two star

const validSubsequent = (time, bus, ...busses) => {
  if (bus === 'x') return validSubsequent(time + 1, ...busses);
  if (time % bus === 0) return validSubsequent(time + 1, ...busses);
  if (bus === undefined) return true;
  return false
}

const firstSubsequentBusses = (busses) => {
  let time = 0;
  while (true) {
    if (validSubsequent(time, ...busses)) return time;
    time = time + 1;
  }
}


console.log(firstSubsequentBusses([17, 'x', 13, 19])); // 3417
console.log(firstSubsequentBusses([67, 7, 59, 61])); // 754018
console.log(firstSubsequentBusses([67, 'x', 7, 59, 61])); // 779210
console.log(firstSubsequentBusses([67, 7, 'x', 59, 61])); // 1261476
console.log(firstSubsequentBusses([1789, 37, 47, 1889])); // 1202161486
// console.log(firstSubsequentBusses(busses)); // two-star