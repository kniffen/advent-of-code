/**
 * Advent of code 2021
 * Day 5
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = 
  fs.readFileSync(path.resolve(__dirname, './2021-05.txt'), 'utf8')
    .split('\n')
    .map(entry => entry.split(' -> ').map(str => str.split(',').map(Number)))

function part1(input) {
  const lines = input.filter(line => line[0][0] === line[1][0] || line[0][1] === line[1][1])
  const arr = []

  for (const line of lines) {
    let start, end

    if (line[0][1] < line[1][1] || line[0][0] < line[1][0]) {
      start = line[0]
      end   = line[1]
    } else {
      start = line[1]
      end   = line[0]
    }

    for (let x = start[0]; x <= end[0]; x++) {
      if (!arr[x]) arr[x] = []
      for (let y = start[1]; y <= end[1]; y++) {
        arr[x][y] = arr[x][y] + 1 || 1
      }
    }
  }

  return arr.flat().filter(n => n > 1).length
}

function part2(lines) {
  const arr = []

  for (const line of lines) {
    // Straight line
    if (line[0][0] === line[1][0] || line[0][1] === line[1][1]) {
      let start, end
      if (line[0][1] < line[1][1] || line[0][0] < line[1][0]) {
        start = line[0]
        end   = line[1]
      } else {
        start = line[1]
        end   = line[0]
      }

      for (let x = start[0]; x <= end[0]; x++) {
        if (!arr[x]) arr[x] = []
        for (let y = start[1]; y <= end[1]; y++) {
          arr[x][y] = arr[x][y] + 1 || 1
        }
      }
    
    // Diagonal line
    } else {
      const xDir = line[0][0] > line[1][0] ? -1 : 1
      const yDir = line[0][1] > line[1][1] ? -1 : 1

      let x = line[0][0]
      let y = line[0][1]

      do {
        if (!arr[x]) arr[x] = []
        arr[x][y] = arr[x][y] + 1 || 1

        x += xDir
        y += yDir
      } while (
        0 >= (1 === xDir ? (x - line[1][0]) : (line[1][0] - x)) &&
        0 >= (1 === yDir ? (y - line[1][1]) : (line[1][1] - y))
      )
    }
  }

  return arr.flat().filter(n => n > 1).length
}

const testData = (
 `0,9 -> 5,9
  8,0 -> 0,8
  9,4 -> 3,4
  2,2 -> 2,1
  7,0 -> 7,4
  6,4 -> 2,0
  0,9 -> 2,9
  3,4 -> 1,4
  0,0 -> 8,8
  5,5 -> 8,2`
).split('\n')
 .map(entry => entry.split(' -> ').map(str => str.split(',').map(Number)))

assert.equal(part1(testData), 5)
assert.equal(part2(testData), 12)

console.log(`
Advent of code 2021 #05

Part 1: ${part1(data)}
Part 2: ${part2(data)}
`)
