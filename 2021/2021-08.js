/**
 * Advent of code 2021
 * Day 8
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = fs.readFileSync(path.resolve(__dirname, './2021-08.txt'), 'utf8')

function part1(input) {
  return input
    .split('\n')
    .map(line => line.match(/[a-z ]+ \| ([a-z ]+)/)[1].split(' '))
    .flat()
    .filter((str) => [2,3,4,7].includes(str.length))
    .length
}

function part2(input) {
  let total = 0

  for (const entry of input.split('\n')) {
    let [str, pattern, output] = entry.match(/([a-z ]+) \| ([a-z ]+)/)
    
    pattern = pattern.split(' ').map(str => str.split(''))
    output  = output.split(' ').map(str => str.split(''))

    const signals = []
    
    // Get 1, 4, 7 and 8 based on string length
    signals[1] = pattern.find(signal => 2 === signal.length)
    signals[4] = pattern.find(signal => 4 === signal.length)
    signals[7] = pattern.find(signal => 3 === signal.length)
    signals[8] = pattern.find(signal => 7 === signal.length)

    // Get 9 from sixes that contain all characters of 4
    signals[9] = pattern.filter(signal => 6 === signal.length).find(signal => signals[4].every(c => signal.includes(c)))

    // Get 0 from sixes (excluding 9) that contain all characters of 1
    signals[0] = pattern.filter(signal => 6 === signal.length && !signal.every(c => signals[9].includes(c))).find(signal => signals[1].every(c => signal.includes(c)))

    // Get 6 from sixes by excluding 9 and 0
    signals[6] = pattern.filter(signal => 6 === signal.length && !signals[9].every(c => signal.includes(c)) && !signals[0].every(c => signal.includes(c)))[0]

    // Get 3 from fives that contain all characters of 1
    signals[3] = pattern.filter(signal => 5 === signal.length).find(signal => signals[1].every(c => signal.includes(c)))

    // Get 5 from fives (excluding 3) but 9 needs to contain all characters of 5
    signals[5] = pattern.filter(signal => 5 === signal.length && !signals[3].every(c => signal.includes(c)) && signal.every(c => signals[9].includes(c)))[0]

    // Get 2 from fives by excluding 3 and 5
    signals[2] = pattern.filter(signal => 5 === signal.length && !signals[3].every(c => signal.includes(c)) && !signals[5].every(c => signal.includes(c)))[0]

    total += parseInt(output.map(code => signals.findIndex(signal => signal.length === code.length && signal.every(c => code.includes(c)))).join(''))
  }

  return total
}

const testData =
`be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`

assert.equal(part1(testData), 26)
assert.equal(part2(testData), 61229)

console.log(`
Advent of code 2021 #08

Part 1: ${part1(data)}
Part 2: ${part2(data)}
`)
