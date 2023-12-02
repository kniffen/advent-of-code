/**
 * Advent of code 2021
 * Day 11
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = fs.readFileSync(path.resolve(__dirname, './2021-11.txt'), 'utf8').split('\n').map(line => line.split('').map(Number))

function getAdjacentCoords(x, y, columns, rows) {
  const adjacent = [
    [x - 1, y - 1], // top left
    [x,     y - 1], // top
    [x + 1, y - 1], // top right
    [x + 1, y    ], // right
    [x + 1, y + 1], // bottom right
    [x,     y + 1], // bottom
    [x - 1, y + 1], // bottom left
    [x - 1, y    ], // left
  ].filter(function([ x, y ]) {
    return x > -1 && x < columns && y > -1 && y < rows
  })

  return adjacent
}

function part1(input) {
  const grid   = input.map(row => row.slice())
  const coords = grid.map((row, y) => row.map((value, x) => [x, y])).flat()

  let total = 0

  for (let i = 0; i < 100; i++) {
    const processed = []
    let queue = coords.slice()
    
    while (0 < queue.length) {
      queue.forEach(([ x, y ]) => grid[y][x]++)

      queue = []
      for (const [ x, y ] of coords.filter(([ x, y ]) => 9 < grid[y][x] && !processed.find(([ i, j ]) => i === x && j === y))) {
        queue = queue.concat(getAdjacentCoords(x, y, grid[y].length, grid.length).filter(([ x, y ]) => 9 >= grid[y][x]))

        processed.push([x, y])
        total++
      }
    }

    coords.forEach(([ x, y ]) => grid[y][x] = grid[y][x] > 9 ? 0 : grid[y][x])
  }

  return total
}

function part2(input) {
  const grid   = input.map(row => row.slice())
  const coords = grid.map((row, y) => row.map((value, x) => [x, y])).flat()

  let count = 0

  for (let i = 0; i < 500; i++) {
    const processed = []
    let queue = coords.slice()
    
    while (0 < queue.length) {
      queue.forEach(([ x, y ]) => grid[y][x]++)

      queue = []
      for (const [ x, y ] of coords.filter(([ x, y ]) => 9 < grid[y][x] && !processed.find(([ i, j ]) => i === x && j === y))) {
        queue = queue.concat(getAdjacentCoords(x, y, grid[y].length, grid.length).filter(([ x, y ]) => 9 >= grid[y][x]))

        processed.push([x, y])
      }
    }

    coords.forEach(([ x, y ]) => grid[y][x] = grid[y][x] > 9 ? 0 : grid[y][x])

    if (grid.flat().every(val => 0 === val)) {
      count = i + 1
      break
    }
  }

  return count
}

const testData = 
`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`.split('\n').map(line => line.split('').map(Number))

assert.equal(part1(testData), 1656)
assert.equal(part2(testData), 195)

console.log(`
Advent of code 2021 #11

Part 1: ${part1(data)}
Part 2: ${part2(data)}
`)
