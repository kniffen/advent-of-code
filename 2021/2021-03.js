const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = fs.readFileSync(path.resolve(__dirname, './2021-03.txt'), 'utf8').split('\n')

function part1(input) {
  const arr = []

  for (let i = 0; i < input.length; i++) {
    const bits = input[i].split('')
    
    if (0 == i) {
      arr.length = bits.length
      arr.fill(0)
    }

    for (let i = 0; i < bits.length; i++) {
      arr[i] += parseInt(bits[i])
    }
  }

  const gamaRate    = parseInt(arr.map(i => i > input.length / 2 ? 1 : 0).join(''), 2)
  const epsilonRate = parseInt(arr.map(i => i > input.length / 2 ? 0 : 1).join(''), 2)

  return gamaRate * epsilonRate
}

function part2(input) {
  let co2GenRating   = input.slice()
  let co2ScrubRating = input.slice()

  const parse = (arr, column, target) => {
    if (!Array.isArray(arr)) return arr
    
    if (1 == arr.length) return arr[0]

    let count = [0, 0]
    for (let i = 0; i < arr.length; i++) {
      count[parseInt(arr[i][column])]++
    }

    if (count[1] >= count[0]) {
      return arr.filter(row => row[column] == target)
    } else if (count[1] < count[0]) {
      return arr.filter(row => row[column] != target)
    }
  }

  for (let i = 0; i < input[0].length; i++) {
    co2GenRating   = parse(co2GenRating, i, 1)
    co2ScrubRating = parse(co2ScrubRating, i, 0)
  }

  return parseInt(co2GenRating, 2) * parseInt(co2ScrubRating, 2)
}

const testData = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
]

assert.equal(part1(testData), 198)
assert.equal(part2(testData), 230)

console.log(`
Advent of code 2021 #03

Part1: ${part1(data)}
Part2: ${part2(data)}
`)