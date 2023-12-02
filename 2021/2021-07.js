/**
 * Advent of code 2021
 * Day 7
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = fs.readFileSync(path.resolve(__dirname, './2021-07.txt'), 'utf8').split(',').map(Number)

function part1(positions) {
  const min = Math.min.apply(Math, positions)
  const max = Math.max.apply(Math, positions)

  let targetPosition = {position: min, fuel: Infinity}
  for (let i = min; i <= max; i++) {
    let totalFuel = 0

    for (const position of positions)
      totalFuel += Math.abs(position - i)

    if (totalFuel < targetPosition.fuel) {
      targetPosition.position = i
      targetPosition.fuel     = totalFuel
    }
  }

  return targetPosition.fuel
}

function part2(positions) {
  const min = Math.min.apply(Math, positions)
  const max = Math.max.apply(Math, positions)

  let targetPosition = {position: min, fuel: Infinity}
  for (let i = min; i <= max; i++) {
    let totalFuel = 0

    for (const position of positions) {
      const n = Math.abs(position - i)
      totalFuel += n * (n + 1) / 2
    }

    if (totalFuel < targetPosition.fuel) {
      targetPosition.position = i
      targetPosition.fuel     = totalFuel
    }
  }

  return targetPosition.fuel
}

const testData = [16,1,2,0,4,2,7,1,2,14]

assert.equal(part1(testData), 37)
assert.equal(part2(testData), 168)

console.log(`
Advent of code 2021 #07

Part 1: ${part1(data)}
Part 2: ${part2(data)}
`)
