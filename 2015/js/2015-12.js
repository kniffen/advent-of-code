/**
 * Advent of code 2015
 * Day 12
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

// Am I supposed to write a JSON parser for this?
// This is JavaScript, so I'm not going to :P
const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/2015-12.txt'), 'utf8'))

function part1(data) {
  const sum = (arr) => {
    let total = 0

    if (!Array.isArray(arr) && typeof arr === 'object') {
      arr = Object.keys(arr).map(key => arr[key])
    }

    for (const item of arr) {
      if (typeof item === 'string') continue
      total += typeof item  === 'object' ? sum(item) : item
    }

    return total
  }

  return sum(data)
}

function part2(data) {
  function hasRed(obj) {
    for (const [ key, value ] of Object.entries(obj)) {
      if ('red' === value) return true
    }
    return false
  }

  function sum(data) {
    if ('object' !== typeof data) return 0

    let total = 0

    if (Array.isArray(data)) {
      for (const item of data) {
        total += typeof item === 'number' ? item : sum(item)    
      }
    } else if (!hasRed(data)) {
      for (const [ key, value ] of Object.entries(data)) {
        total += typeof value === 'number' ? value : sum(value)
      }
    }

    return total
  }

  return sum(data)
}

assert.equal(part1([1,2,3]),              6)
assert.equal(part1({"a":2,"b":4}),        6)
assert.equal(part1([[[3]]]),              3)
assert.equal(part1({"a":{"b":4},"c":-1}), 3)
assert.equal(part1({"a":[-1,1]}),         0)
assert.equal(part1([-1,{"a":1}]),         0)
assert.equal(part1([]),                   0)
assert.equal(part1({}),                   0)

assert.equal(part2([1,2,3]),                         6)
assert.equal(part2([1,{"c":"red","b":2},3]),         4)
assert.equal(part2({"d":"red","e":[1,2,3,4],"f":5}), 0)
assert.equal(part2([1,"red",5]),                     6)

console.log(`
Advent of code 2015 #12

Part 1: ${part1(data)}
Part 2: ${part2(data)}
`)