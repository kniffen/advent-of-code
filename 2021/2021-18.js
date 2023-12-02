/**
 * Advent of code 2021
 * Day 18
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

console.clear()

const data = fs.readFileSync(path.resolve(__dirname, './2021-18.txt'), 'utf8').split('\n')

function explode(pair) {
  const before    = pair.before.split('')
  const after     = pair.after.split('')
  const numBefore = pair.before.match(/(\d+)[\[|,|\]]*$/)
  const numAfter  = pair.after.match(/(\d+)/)
  
  if (numBefore)
    before.splice(numBefore.index, numBefore[1].length, parseInt(numBefore[1]) + parseInt(pair.match[1]))

  if (numAfter)
    after.splice(numAfter.index, numAfter[1].length, parseInt(numAfter[1]) + parseInt(pair.match[2]))

  return `${before.join('')}0${after.join('')}`
}

function split(str, num) {
  const a = str.split('')
  
  a.splice(num.index, num[0].length, `[${Math.floor(num[0]/2)},${Math.ceil(num[0]/2)}]`)
  
  return a.join('')
}

function reduce(str) {
  const pair =
    [...str.matchAll(/\[(\d+),(\d+)\]/g)]
      .map(match => {
        const before  = str.slice(0, match.index)
        const after   = str.slice(match.index+match[0].length, str.length)
        const openers = (before.match(/\[/g)?.length || 0) - (before.match(/\]/g)?.length || 0)
        const closers = (after.match(/\]/g)?.length || 0) - (after.match(/\[/g)?.length || 0)
        
          return {match, before, after, openers, closers}
      })
      .filter(({ openers, closers }) => !(openers < 4 || closers < 4))?.[0]

  const highNum = str.match(/\d{2,}/)

  if (pair) {
    str = explode(pair)
  } else if (highNum) {
    str = split(str, highNum)
  }

  return str
}

// Reduction tests
assert.equal(reduce('[[[[[9,8],1],2],3],4]'), '[[[[0,9],2],3],4]')
assert.equal(reduce('[7,[6,[5,[4,[3,2]]]]]'), '[7,[6,[5,[7,0]]]]')
assert.equal(reduce('[[6,[5,[4,[3,2]]]],1]'), '[[6,[5,[7,0]]],3]')
assert.equal(reduce('[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]'), '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]')
assert.equal(reduce('[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]'), '[[3,[2,[8,0]]],[9,[5,[7,0]]]]')

function process(str) {
  let a = str

  while (true) {
    const b = reduce(a)
    if (b === a) break
    a = b
  }

  return a
}

// Process tests
assert.equal(process(add('[[[[4,3],4],4],[7,[[8,4],9]]]', '[1,1]')), '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]')

function add(a, b) {
  return `[${a},${b}]`
}

// Addition tests
assert.equal(add('[[[[4,3],4],4],[7,[[8,4],9]]]', '[1,1]'), '[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]')

function sum(arr) {
  let a = arr[0]

  for (let i = 1; i < arr.length; i++)
    a = process(add(a, arr[i]))

  return a
}

// Sum tests
assert.equal(sum(['[1,1]', '[2,2]', '[3,3]','[4,4]']), '[[[[1,1],[2,2]],[3,3]],[4,4]]')
assert.equal(sum(['[1,1]', '[2,2]', '[3,3]','[4,4]', '[5,5]']), '[[[[3,0],[5,3]],[4,4]],[5,5]]')
assert.equal(sum(['[1,1]', '[2,2]', '[3,3]','[4,4]', '[5,5]', '[6,6]']), '[[[[5,0],[7,4]],[5,5]],[6,6]]')

function calculateMagnitude(str) {
  let pair
  do {
    pair = str.match(/\[(\d+),(\d+)\]/)
    if (pair) {
      str = str.split('')
      str.splice(pair.index, pair[0].length, parseInt(pair[1])*3+parseInt(pair[2])*2)
      str = str.join('')
    }
  } while (pair)
  
  return str
}

// Magnitude tests
assert.equal(calculateMagnitude('[9,1]'), 29)
assert.equal(calculateMagnitude('[[9,1],[1,9]]'), 129)
assert.equal(calculateMagnitude('[[1,2],[[3,4],5]]'), 143)
assert.equal(calculateMagnitude('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]'), 1384)
assert.equal(calculateMagnitude('[[[[1,1],[2,2]],[3,3]],[4,4]]'), 445)
assert.equal(calculateMagnitude('[[[[3,0],[5,3]],[4,4]],[5,5]]'), 791)
assert.equal(calculateMagnitude('[[[[5,0],[7,4]],[5,5]],[6,6]]'), 1137)
assert.equal(calculateMagnitude('[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]'), 3488)

const testData = 
`[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]`.split('\n')

assert.equal(sum(testData), '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]')
assert.equal(calculateMagnitude(sum(testData)), 3488)

const testData2 =
`[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`.split('\n')
assert.equal(calculateMagnitude(sum(testData2)), 4140)

const testData3 = `
[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`.split('\n')

function part1(data) {
  return calculateMagnitude(sum(data))
}

function part2(data) {
  const magnitudes = []
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      magnitudes.push(calculateMagnitude(sum([data[i], data[j]])))
    }
  }

  // There seems to me a small issue with extra commas somewhere
  return magnitudes.map(Number).filter(n => !isNaN(n)).sort((a, b) => b - a)[0]
}

assert.equal(part2(testData3), 3993)

console.log(`
Advent of code 2021 Day 18

Part 1: ${part1(data)}
Part 2: ${part2(data)}
`)
