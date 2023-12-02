/**
 * Advent of code 2021
 * Day 10
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = fs.readFileSync(path.resolve(__dirname, './2021-10.txt'), 'utf8')

const openerChars = ['(', '[', '{', '<']
const closerChars = [')', ']', '}', '>']

function findClosers(line) {
  const expectedClosers = []
  const closers         = []

  for (const c of line) {
    const opener = openerChars.indexOf(c)
    const closer = closerChars.indexOf(c)

    if (opener >= 0) {
      expectedClosers.unshift(opener)
    } else if (closer >= 0) {
      if (expectedClosers[0] === closer) {
        expectedClosers.shift()
      } else {
        closers.push(closer)
      }
    }
  }

  return {closers, expectedClosers}
}

function part1(input) {
  const lines  = input.split('\n')
  const points = [3, 57, 1197, 25137]

  const score =
    lines
      .map(line => findClosers(line).closers)
      .filter(closers => 0 < closers.length)
      .map(closers => closers[0])
      .reduce((total, i) => total + points[i], 0)

  return score
}

function part2(input) {
  const lines = input.split('\n')

  const scores = 
    lines
      .map(line => findClosers(line))
      .filter(({ closers }) => 0 >= closers.length)
      .map(({ expectedClosers }) => expectedClosers.reduce((total, i) => total * 5 + i + 1, 0))
      .sort((a, b) => a - b)

  return scores[Math.floor(scores.length / 2)]
}

const testData = 
`[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`

assert.equal(part1(testData), 26397)
assert.equal(part2(testData), 288957)

console.log(`
Advent of code 2021 #10

Part 1: ${part1(data)}
Part 2: ${part2(data)}
`)
