/**
 * Advent of code ????
 * Day ??
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = parseInput(fs.readFileSync(path.resolve(__dirname, '../data/????-??.txt'), 'utf8'))

function parseInput(input) {
  return input.replace(/\r/g, '').trim().split('\n')
}

function part1(input) {
  
  return 0
}

function part2(input) {
  
  return 0
}

const testData = parseInput(``)

assert.equal(part1(testData), 0)
assert.equal(part2(testData), 0)

console.log(`
Advent of code ????, Day ??

Part 1: ${part1(data)}
Part 2: ${part2(data)}
`)
