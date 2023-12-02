/**
 * Advent of code 2021
 * Day 9
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = fs.readFileSync(path.resolve(__dirname, './2021-09.txt'), 'utf8')

// Get all valid adjacent sides of a coordinate in the grid
function getAdjacentCoords(arr, [ x, y ]) {
  const adjacentCoords = [
    [x,     y - 1],
    [x + 1, y    ],
    [x,     y + 1],
    [x - 1, y    ],
  ].filter(coord => 0 <= coord[0] && arr[0].length > coord[0] && 0 <= coord[1] && arr.length > coord[1])

  return adjacentCoords
}

function getLowPointCoords(rows) {
  // Lowpoints are gathered only of a coordinate has an equal amount of larder adjacent values
  const lowPoints = []

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      const adjacentValues = getAdjacentCoords(rows, [x, y]).map(coord => rows[coord[1]][coord[0]])

      if (adjacentValues.filter(value => value > rows[y][x]).length === adjacentValues.length)
        lowPoints.push([x, y])
    }
  }

  return lowPoints
}

function part1(input) {
  const rows = input.split('\n').map(line => [...line].map(Number))

  return getLowPointCoords(rows).map(coords => rows[coords[1]][coords[0]] + 1).reduce((a, b) => a + b)
}

function part2(input) {
  const rows           = input.split('\n').map(line => [...line].map(Number))
  const lowPointCoords = getLowPointCoords(rows)
  const basins         = []

  const setBasinPoints = (coord, arr = []) => {
    // Quit early if the coordinate is already on the basin, or its value is 9
    if (arr.find(([ x, y ]) => x === coord[0] && y === coord[1]) || rows[coord[1]][coord[0]] === 9) return
    
    arr.push(coord)
    getAdjacentCoords(rows, coord).forEach(c => setBasinPoints(c, arr))
    
    return arr
  }

  for (const lowPointCoord of lowPointCoords) {
    basins.push(setBasinPoints(lowPointCoord))
  }
  
  const basinSizes =
    basins
      .map(basin => basin.map(coord => rows[coord[1]][coord[0]]).length)
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((a, b) => a * b)

  return basinSizes
}

const testData = 
`2199943210
3987894921
9856789892
8767896789
9899965678`

assert.equal(part1(testData), 15)
assert.equal(part2(testData), 1134)

console.log(`
Advent of code 2021 #09

Part 1: ${part1(data)}
Part 2: ${part2(data)}
`)
