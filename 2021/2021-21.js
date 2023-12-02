/**
 * Advent of code 2021
 * Day 21
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = parseInput(fs.readFileSync(path.resolve(__dirname, './2021-21.txt'), 'utf8'))

function parseInput(input) {
  return input
    .replace(/\r/g, '')
    .trim()
    .split('\n')
    .map(line => {
      const [_, player, pos] = line.match(/(\d+).*(\d+)/)
      return { player: parseInt(player), pos: parseInt(pos), roll: 0, score: 0}
    })
}

function diracDice(players) {
  const [ p1, p2 ] = players
  let count = 0
  while (p1.score < 1000 && p2.score < 1000) {
    if (0 === count % 2) {
      p1.roll += 0 === count ? 6 : 18
      p1.pos = (p1.pos + p1.roll) % 10 || 10
      p1.score += p1.pos
    } else {
      p2.roll += 1 === count ? 15 : 18
      p2.pos = (p2.pos + p2.roll) % 10 || 10
      p2.score += p2.pos
    }

    count++
  }

  return {players, count}
}

function part1(data) {
  const { players, count } = diracDice(data)
  const loser = players.sort((a, b) => a.score - b.score)[0]
  
  return loser.score * count * 3
}

function part2(data) {
  
  return 0
}

const testData = parseInput(
`Player 1 starting position: 4
Player 2 starting position: 8`
)

assert.equal(part1(testData), 739785)
// assert.equal(part2(testData), 444356092776315)

console.log(`
Advent of code 2021 Day 21

Part 1: ${part1(data)}
`)
