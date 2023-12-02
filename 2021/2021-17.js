/**
 * Advent of code 2021
 * Day 17
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = parseInput(fs.readFileSync(path.resolve(__dirname, './2021-17.txt'), 'utf8'))

function parseInput(input) {
  const values =
    input
      .match(/target area: x=([\-0-9]+)\.\.([\-0-9]+), y=([\-0-9]+)\.\.([\-0-9]+)/i)
      .slice(1, 5)
      .map(Number)

  return {
    x: values.splice(0, 2),
    y: values.splice(0, 2),
  }
}

function simulate(vel, targetArea) {
  const gravity   = -1
  const pos       = [0, 0]
  const initVel   = [...vel]
  let   isInside  = false

  let maxY = 0
  while (pos[1] > Math.min(...targetArea.y)) {
    pos[0] += vel[0]
    pos[1] += vel[1]

    if (pos[1] > maxY) maxY = pos[1]

    vel[0] += 0 === vel[0] ? 0 : vel[0] > 0 ? -1 : 1
    vel[1] += gravity

    if (pos[0] >= targetArea.x[0] && pos[0] <= targetArea.x[1] && pos[1] >= targetArea.y[0] && pos[1] <= targetArea.y[1]) {
      isInside = true
      break
    }
  }

  return isInside ? { maxY, vel: initVel } : null
}

function runSimulations(targetArea) {
  const simulations = []

  // Basic rangle calculation, could be improved
  const tan = Math.abs(Math.min(...targetArea.x) / Math.max(...targetArea.y))
  const velRange = {
    x: [0,                         Math.max(...targetArea.x)],
    y: [Math.min(...targetArea.y), Math.max(...targetArea.x) * tan],
  }

  for (let vx = velRange.x[0]; vx <= velRange.x[1]; vx++) {
    for (let vy = velRange.y[0]; vy <= velRange.y[1]; vy++) {
      const simulation = simulate([vx, vy], targetArea)
      if (simulation) simulations.push(simulation)
    }
  }

  return simulations
}

function part1(targetArea) {
  return runSimulations(targetArea).sort((a, b) => b.maxY - a.maxY)[0].maxY
}

function part2(targetArea) {
  return runSimulations(targetArea).length
}

const testData = parseInput(`target area: x=20..30, y=-10..-5`)

assert.equal(part1(testData), 45)
assert.equal(part2(testData), 112)

console.log(`
Advent of code 2021, Day 17

Part 1: ${part1(data)}
Part 2: ${part2(data)}
`)
