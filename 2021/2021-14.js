/**
 * Advent of code 2021
 * Day 14
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = fs.readFileSync(path.resolve(__dirname, './2021-14.txt'), 'utf8')

function parseInput(input) {
  return input
    .split('\n')
    .reduce((data, line, i) => {
      if (0 === i) {
        data.polymer = line
      } else if ( 2 <= i) {
        const [ a, b, , , , , c ] = line.split('')
        data.rules[a+b] = c
      }
      return data
    }, {polymer: null, rules: []})
}

function runInsertions(polymer, rules, steps) {
  const count = (arr) => arr.reduce((count, v) => (count[v] = count[v]+1 || 1, count), {})
  
  const chars = count(polymer.split(''))
  const pairs = count([...Array(polymer.length - 1)].map((v, i) => (polymer[i]+polymer[i + 1])))

  for (let i = 0; i < steps; i++) {
    const pairCounts = Object.keys(pairs).map(pair => [pair, pairs[pair]])

    for (const [ pair, count ] of pairCounts) {
      if (1 > count) continue

      const char = rules[pair]

      // Add to count of char, this always increases
      chars[char]         = chars[char]         + count || count

      // Remove count of previous pair
      pairs[pair]         = pairs[pair]         - count

      // Add count of new pair
      pairs[pair[0]+char] = pairs[pair[0]+char] + count || count
      pairs[char+pair[1]] = pairs[char+pair[1]] + count || count
    }
  }

  return {chars, pairs}
}

function part1(input) {
  let { polymer, rules } = parseInput(input)

  const { chars } = runInsertions(polymer, rules, 10)
  const counts = Object.keys(chars).map(char => chars[char]).sort((a, b) => b - a)

  return counts[0] - counts[counts.length - 1]
}

function part2(input) {
  let { polymer, rules } = parseInput(input)

  const { chars } = runInsertions(polymer, rules, 40)
  const counts = Object.keys(chars).map(char => chars[char]).sort((a, b) => b - a)

  return counts[0] - counts[counts.length - 1]
}

const testData = 
`NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`

assert.equal(part1(testData), 1588)
assert.equal(part2(testData), 2188189693529)

console.log(`
Advent of code 2021 #14

Part 1: ${part1(data)}
Part 2: ${part2(data)}
`)