const fs = require('fs')

const rules = fs.readFileSync('./input6.txt')
                 .toString()
                 .split('\n');

// light red bags contain 1 bright white bag, 2 muted yellow bags.
// dark orange bags contain 3 bright white bags, 4 muted yellow bags.

const graph = {};
for(const rule of rules) {
    const [bag, [canContain]] = parse(rule);
    graph[bag] = canContain;
}

const travled = {}
function canGetTO(start, target) {
    
}

const bags = Object.keys(graph);
console.log(bags.filter(bag => canGetTO(bag, 'shiny gold')).length);