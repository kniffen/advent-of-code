const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = fs.readFileSync(path.resolve(__dirname, './2021-01.txt'), 'utf8').split('\n').map(s => parseInt(s))

function part1(input) {
  let count = 0
  
  for (let i = 0; i < input.length; i++) {
    if (i <= 0) continue

    if (input[i] > input[i-1])
      count++
  }

  return count
}

function part2(input) {
  let count    = 0
  let previous = 0

  for (let i = 0; i < input.length; i++) {
    const current = input[i] + input[i+1] + input[i+2]
    
    if (i > 0 && current > previous)
      count++

    previous = current
  }

  return count
}

const testData = [
  199,
  200,
  208,
  210,
  200,
  207,
  240,
  269,
  260,
  263,
]

assert.equal(part1(testData), 7)
assert.equal(part2(testData), 5)

console.log(`
Advent of code 2021 #01

Part1: ${part1(data)}
Part2: ${part2(data)}
`)