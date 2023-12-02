/**
 * Advent of code 2015
 * Day 11
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = fs.readFileSync(path.resolve(__dirname, '../data/2015-11.txt'), 'utf8')

function isValid(arr) {
  // check for invalid characters (i, l, o)
  if (arr.find(num => [105, 108, 111].includes(num)))
    return false

  // Check for tripple sequenses, needs at least 1
  const sequences = []
  for (let i = 0; i < arr.length - 2; i++) {
    if (arr[i + 1] === arr[i] + 1 && arr[i + 2] === arr[i] + 2) {
      sequences.push([arr[i], arr[i+1], arr[i+2]])
    }
  }
  if (sequences.length < 1) return false

  // Check for pairs, needs at least two
  for (let i = 0; i < arr.length-2; i++) {
    for (let j = i+1; j < arr.length; j++) {
      if (arr[i] !== arr[i+1]) continue
      if (arr[j] === arr[j+1] && arr[j] !== arr[i]) return true
    }
  }

  return false
}

function increase(arr, i = arr.length - 1) {
  arr[i]++
  
  if (arr[i] >= 123 && i > 0) {
    arr[i] = 97
    increase(arr, i - 1)
  }

  return arr
}

function generatePassword(input) {
  const password = input.split('').map(c => c.charCodeAt(0))

  while (!isValid(password)) {
    increase(password)
  }

  return password.map(n => String.fromCharCode(n)).join('')
}

assert.equal(generatePassword('abcdefgh'), 'abcdffaa')
assert.equal(generatePassword('ghijklmn'), 'ghjaabcc')

console.log(`
Advent of code 2015 #11

Part 1: ${generatePassword(data)}
Part 2: ${generatePassword(increase(generatePassword(data).split('').map(c => c.charCodeAt(0))).map(n => String.fromCharCode(n)).join(''))}
`)