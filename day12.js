const fs = require('fs')

// F10
// N3
// F7
// R90
// F11

const instructions = fs.readFileSync('./input12.txt')
                      .toString()
                      .split('\n');

let direction = 'E';
const position = {x: 0, y: 0};

const north = (value) => {
  position.y += value;
};
const south = (value) => {
  position.y -= value
};
const east = (value) => {
  position.x += value
};
const west = (value) => {
  position.x -= value
};

const move = (value, dir = direction) => {
  if (dir === 'N') north(value);
  if (dir === 'S') south(value);
  if (dir === 'E') east(value);
  if (dir === 'W') west(value);
};

const turn = (leftOrRight, value) => {
  const simplyfyDegrees = (degrees) => {
    if (degrees === 90) return 1;
    if (degrees === 180) return 2;
    if (degrees === 270) return 3;
    return 0;
  }
  const way = (leftOrRight === 'L') ? -1 : 1;
  const turns = way * simplyfyDegrees(value)

  const globalDirections = ['N', 'E', 'S', 'W'];
  const current = globalDirections.findIndex(d => d === direction);
  const cycle = current + turns;
  return globalDirections[((cycle % 4) + 4) % 4] // Modulo not remainder
};

for(instruction of instructions) {
  const [action, stringValue] = instruction.split(/(\d+)/)
  const value = Number(stringValue)

  if (['N', 'S', 'E', 'W'].includes(action)) {
    move(value, action);
  } else if (['L', 'R'].includes(action)) {
    direction = turn(action, value)
  } else if (action == 'F') {
    move(value);
  } 
}

const manhattanDistance = (x, y) => {
  return Math.abs(x) + Math.abs(y);
}

console.log(manhattanDistance(position.x, position.y));

// Two star

const waypoint = { x: 10, y: 1 };
const ship = { x: 0, y: 0 };

const moveWaypoint = ({ latitude, amount }) => {
  if (latitude === 'N') waypoint.y += amount;
  if (latitude === 'S') waypoint.y -= amount;
  if (latitude === 'E') waypoint.x += amount;
  if (latitude === 'W') waypoint.x -= amount;
};

const rotate = ({ direction, amount }) => {
  if (amount === 0) return;
  const { x, y } = waypoint;
  if (direction === 'R') {
    // (x, y) replaced with (y, -x)
    waypoint.x = y;
    waypoint.y = -1 * x;
  }
  if (direction === 'L') {
    // (x, y) replaced with (-y, x)
    waypoint.x = -1 * y;
    waypoint.y = x;
  }
  rotate({ direction, amount: amount - 90 });
};

const moveToWaypoint = ({ times }) => {
  for(let i = 0; i < times; i++) {
    ship.x += waypoint.x;
    ship.y += waypoint.y;
  }
};

const parseInstruction = (instruction) => {
  // F45, R90, S5 etc.
  return {
    command: instruction[0],
    value: Number(instruction.slice(1)),
  };
};

for(const { command, value } of instructions.map(parseInstruction)) {
  if (['N', 'S', 'E', 'W'].includes(command)) {
    moveWaypoint({ latitude: command, amount: value });
  } else if (['L', 'R'].includes(command)) {
    rotate({ direction: command, amount: value });
  } else if (command == 'F') {
    moveToWaypoint({ times: value });
  }
}

console.log(manhattanDistance(ship.x, ship.y));