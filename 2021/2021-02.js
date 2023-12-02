const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = fs.readFileSync(path.resolve(__dirname, './2021-02.txt'), 'utf8').split('\n')

function part1(input) {
  let horizontalPos = 0
  let depthPos      = 0
  
  for (const entry of input) {
    let [dir, count] = entry.split(' ')
    count = parseInt(count)

    switch (dir) {
      case 'forward':
        horizontalPos += count
        break
      case 'down':
        depthPos += count
        break
      case 'up':
        depthPos -= count
        break
    }
  }

  return depthPos * horizontalPos
}

function part2(input) {
  let horizontalPos = 0
  let depthPos      = 0
  let aim           = 0
  
  for (const entry of input) {
    let [dir, count] = entry.split(' ')
    count = parseInt(count)

    switch (dir) {
      case 'forward':
        horizontalPos += count
        depthPos      += count * aim
        break
      case 'down':
        aim += count
        break
      case 'up':
        aim -= count
        break
    }
  }

  return depthPos * horizontalPos
}

const testData = [
  'forward 5',
  'down 5',
  'forward 8',
  'up 3',
  'down 8',
  'forward 2',
]

assert.equal(part1(testData), 150)
assert.equal(part2(testData), 900)

console.log(`
Advent of code 2021 #02

Part1: ${part1(data)}
Part2: ${part2(data)}
`)