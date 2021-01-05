const fs = require('fs')

let inputData = fs.readFileSync('./input1.txt')
                       .toString()
                       .split('\n')
let expenseReport = inputData.map((s) => Number(s))


function addsUpTo(list, upToNumber) {
    for(const first of list) {
       for(const second of list){
           for(const third of list){
               if(first + second + third === upToNumber) {
                   return [first, second, third]
               }
           }
       }
    }
}
console.log(addsUpTo(expenseReport, 2020).reduce((acc, curr) => acc * curr));


function combinations(list, n) {

}

function sum(acc, curr) { return acc + curr }

function product(acc, curr) { return acc * curr }

console.log(
    combinations(expenseReport, 2).find((combination) => combination.reduce(sum) === 2020).reduce(product)
);





