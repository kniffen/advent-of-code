const path  = require('path')
const fs    = require('fs')

const data = fs.readFileSync(path.resolve(__dirname, '../data/2015-05.txt'), 'utf8')

function isNice1(input) {
  const vowels    = ['a', 'e', 'i', 'o', 'u']
  const blacklist = ['ab', 'cd', 'pq', 'xy']

  const vowelCount     = input.split('').filter(c => vowels.includes(c)).length
  const duplicateCount = input.split('').filter((c, i) => input[i + 1] == c).length
  const blacklistCount = blacklist.filter(w => input.includes(w)).length

  return vowelCount > 2 && duplicateCount > 0 && blacklistCount == 0
}

function isNice2(input) {
  let duplicateCount = 0

  input.split('').forEach((c, i) => {
    const restOfWord = input.substring(i+2, input.length)
    const chars = input[i]+input[i+1]
    if (restOfWord.includes(chars)) duplicateCount++
  })

  const spaceBetweenCount = input.split('').filter((c, i) => input[i + 2] == c).length

  return  duplicateCount > 0 && spaceBetweenCount > 0
}

console.clear()

console.assert( isNice1('ugknbfddgicrmopn') == true,  'Part 1 Test 1' )
console.assert( isNice1('aaa')              == true,  'Part 1 Test 2' )
console.assert( isNice1('jchzalrnumimnmhp') == false, 'Part 1 Test 3' )
console.assert( isNice1('haegwjzuvuyypxyu') == false, 'Part 1 Test 4' )
console.assert( isNice1('dvszwmarrgswjxmb') == false, 'Part 1 Test 5' )

console.assert( isNice2('qjhvhtzxzqqjkmpb') == true,  'Part 2 Test 1' )
console.assert( isNice2('xxyxx')            == true,  'Part 2 Test 2' )
console.assert( isNice2('uurcxstgmygtbstg') == false, 'Part 2 Test 3' )
console.assert( isNice2('ieodomkazucvgmuy') == false, 'Part 2 Test 4' )

console.log( `
Advent of code 2015 #05
Part1: ${data.split('\n').filter(word => isNice1(word)).length}
Part2: ${data.split('\n').filter(word => isNice2(word)).length}
` )