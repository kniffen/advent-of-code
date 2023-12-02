/**
 * Advent of code 2015
 * Day 10
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = fs.readFileSync(path.resolve(__dirname, '../data/2015-10.txt'), 'utf8')

function sequence(input, loops) {
  let str = input
  
  for (let i = 0; i < loops; i++) {
    str =
      str
        .split('')
        .reduce((pairs, char) => {
          const index = pairs.length - 1
          
          if (index >= 0 && pairs[index].includes(char)) {
            pairs[index].push(char)
          } else {
            pairs.push([char])
          }

          return pairs
        }, [])
        .map(arr => arr.length + arr[0])
        .join('')
  }
 
  return str.length
}

const testData = '1'

assert.equal(sequence(testData, 5), 6)

console.log(`
Advent of code 2015 #10

Part 1: ${sequence(data, 40)}
Part 2: ${sequence(data, 50)}
`)