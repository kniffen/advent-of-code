const path  = require('path')
const fs    = require('fs')

const data = fs.readFileSync(path.resolve(__dirname, '../data/2015-04.txt'), 'utf8')
const crypto = require('crypto')

function findHashCount(input, zeros) {
  let count = 1

  while (count < Math.pow(10, input.length)) {
    const hash = crypto.createHash('md5').update(input + count).digest('hex')

    if (hash.substring(0, zeros) == Array(zeros+1).join('0')) {
      break
    }
    
    count++
  }

  return count
}

console.clear()

console.log( 'Tests' )
console.assert( findHashCount('abcdef', 5)  == 609043 )
console.assert( findHashCount('pqrstuv', 5) == 1048970 )

console.log( `
Advent of code 2015 #04
Part1: ${findHashCount(data, 5)}
Part2: ${findHashCount(data, 6)}
` )