/**
 * Advent of code 2021
 * Day 13
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = fs.readFileSync(path.resolve(__dirname, './2021-13.txt'), 'utf8')

function parseInput(input) {
  const data =
    input
      .split('\n')
      .reduce((data, entry) => {
        if (entry.includes(',')) {
          data.coords.push(entry.split(',').map(Number))
        } else if ('' !== entry){
          data.folds.push(entry.split(' ').pop().split('=').map(fold => isNaN(fold) ? fold : Number(fold)))
        }

        return data
      }, {coords: [], folds: []})
  
  return data
}

function displayGrid(coords) {
  const columns = coords.reduce((highest, next) => highest > next[0] ? highest : next[0], 0) + 1
  const rows    = coords.reduce((highest, next) => highest > next[1] ? highest : next[1], 0) + 1

  for (let y = 0; y < rows; y++) {
    const arr = []
    arr.length = columns
    arr.fill('.')
    console.log(arr.map((v, x) => coords.find(coord => coord[0] === x && coord[1] === y) ? '#' : v).join(''))
  }

  console.log('\n')
}

function fold(coords, folds, amount = 1) {
  let columns = coords.reduce((highest, next) => highest > next[0] ? highest : next[0], 0) + 1
  let rows    = coords.reduce((highest, next) => highest > next[1] ? highest : next[1], 0) + 1

  for (let i = 0; i < amount; i++) {
    const [ axis, foldPos ] = folds[i]

    const halves = []

    // This part could be cleaned up some
    if ('y' === axis) {
      const topRows    = rows - foldPos - 1
      const bottomRows = rows - topRows - 1

      rows = topRows > bottomRows ? topRows : bottomRows
      
      halves[0] = coords.filter(coord => coord[1] < foldPos)
      halves[1] = coords.filter(coord => coord[1] > foldPos).map(coord => [coord[0], Math.ceil(bottomRows - (coord[1] - foldPos))])

    } else if('x' === axis) {
      const leftColumns  = columns - foldPos - 1
      const rightColumns = columns - foldPos - 1

      columns = leftColumns > rightColumns ? leftColumns : rightColumns

      halves[0] = coords.filter(coord => coord[0] < foldPos)
      halves[1] = coords.filter(coord => coord[0] > foldPos).map(coord => [Math.ceil(rightColumns - (coord[0] - foldPos)), coord[1]])
    }

    coords = halves.flat().reduce((combo, coord) => {
      if (!combo.find(existing => existing[0] === coord[0] && existing[1] === coord[1]))
        combo.push(coord)
      return combo
    }, [])
  }

  return coords
}

function part1(input) {
  const data = parseInput(input)

  return fold(data.coords, data.folds).length
}

function part2(input) {
  const data = parseInput(input)

  displayGrid(fold(data.coords, data.folds, data.folds.length))
}

const testData = 
`6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`

assert.equal(part1(testData), 17)

console.log(`
Advent of code 2021 #13

Part 1: ${part1(data)}
Part 2: ${part2(data) || 'See ASCII output'}
`)