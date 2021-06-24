
const reverseFindIndex = (element, array, startAt = array.length) => {
  for(let i = startAt; i >= 0; i--) {
    if (array[i] === element) {
      return i
    }
  }
};

const oneStar = (startingNumbers) => {
  const numbers = startingNumbers;
  while(numbers.length !== 2020) {
    const [spokenNumbers, last] = [numbers.slice(0, -1), numbers[numbers.length - 1]]
    
    const lastSpokenIndex = reverseFindIndex(last, spokenNumbers);
    if (lastSpokenIndex === undefined) {
      numbers.push(0);
    } else {
      numbers.push(numbers.length - 1 - lastSpokenIndex)
    }
  }
  return numbers[numbers.length - 1]
}

console.log(oneStar([1,3,2])) // 1.
console.log(oneStar([2,1,3])) // 10.
console.log(oneStar([1,2,3])) // 27.
console.log(oneStar([2,3,1])) // 78.
console.log(oneStar([3,2,1])) // 438.
console.log(oneStar([3,1,2])) // 1836.
console.log(oneStar([12,1,16,3,11,0])) // 1696.
