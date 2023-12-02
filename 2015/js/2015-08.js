/**
 * Advent of code 2015
 * Day 8
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = fs.readFileSync(path.resolve(__dirname, '../data/2015-08.txt'), 'utf8').split('\n')

function part1(input) {
  const rawLength  = input.join('').length
  const charLength = eval(`[${input.join(',')}]`).join('').length
  
  return rawLength - charLength
}

function part2(input) {
  const escapedRawLength = JSON.stringify(input, null, '').replace(/\[|]|,/g, '').length
  const rawLength        = input.join('').length

  return escapedRawLength - rawLength
}

const testData =
  String.raw`""
"abc"
"aaa\"aaa"
"\x27"
`.split('\n')

assert.equal(part1(testData), 12)
assert.equal(part2(testData), 21)

console.log(`
Advent of code 2015 #08

Part 1: ${part1(data)}
Part 2: ${part2(data)}
`)