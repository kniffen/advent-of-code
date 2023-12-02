/**
 * Advent of code 2021
 * Day 20
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = parseInput(fs.readFileSync(path.resolve(__dirname, './2021-20.txt'), 'utf8'))

function parseInput(input) {
  const image     = input.replace(/\r/g, '').trim().split('\n').filter(line => '' !== line)
  const algorithm = image.shift().split('').map(c => '#' === c ? 1 : 0)

  const rows    = image.length
  const columns = image[0].length
  
  const lit = []
  for (let y = 0; y < image.length; y++) {
    const line = image[y].split('')
    for (let x = 0; x < line.length; x++) {
      if ('#' === line[x]) lit.push(x + y * line.length)
    }
  }
  return {
    algorithm,
    image: {
      rows,
      columns,
      lit,
    }
  }
}

function getAdjacent([ x, y ]) {
  return [
    [x-1, y-1], [x, y-1], [x+1, y-1],
    [x-1, y  ], [x, y  ], [x+1, y  ],
    [x-1, y+1], [x, y+1], [x+1, y+1],
  ]
}

function drawTable(table) {
  for (let y = 0; y < table.rows; y++) {
    const line = new Array(table.columns)
    for (let x = 0; x < table.columns; x++) {
      line[x] = table.lit.includes(x + y * table.columns) ? '#' : '.'
    }
    console.log(line.join(''))
  }
  console.log('\n')
}

function getPixel(coords, original, i, algorithm) {
  let sequence = ''
  for (const [ x, y ] of coords) {
    if (x >= 0 && x < original.columns && y >= 0 && y < original.rows) {
      sequence += original.lit.includes(x + y * original.columns) ? 1 : 0
    } else {
      sequence += algorithm[0] ? i % 2 : 0
    }
  }

  return algorithm[parseInt(sequence, 2)]
}

function enhance({ image, algorithm }, enhancements) {
  let original = {
    rows:    image.rows,
    columns: image.columns,
    lit:     image.lit
  }

  for (let i = 0; i < enhancements; i++) {
    const enhanced = {
      rows:    original.rows    + 2,
      columns: original.columns + 2,
      lit:     [],
    }

    for (let y = 0; y < enhanced.rows; y++) {
      for (let x = 0; x < enhanced.columns; x++) {
        if (getPixel(getAdjacent([x-1, y-1]), original, i, algorithm)) {
          enhanced.lit.push(x + y * enhanced.columns)
        }
      }
    }

    // drawTable(original)
    // drawTable(enhanced)

    original = enhanced
  }

  return original.lit.length
}

const testData = parseInput(
`..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###
`)

assert.equal(enhance(testData, 2), 35)
assert.equal(enhance(testData, 50), 3351)

console.log(`
Advent of code 2021, Day 20

Part 1: ${enhance(data, 2)}
Part 2: ${enhance(data, 50)}
`)