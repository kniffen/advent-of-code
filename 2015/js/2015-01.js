const path = require('path')
const fs   = require('fs')

const data = fs.readFileSync(path.resolve(__dirname, '../data/2015-01.txt'), 'utf8')

function part1(input) {
  let output = 0

  input.split('').forEach(step => {
    if (step == '(') {
      output++
    } else if (step == ')') {
      output--
    }
  })

  return output
}

function part2(input) {
  let pos = 0
  let output
  const data = input.split('')

  for (let i = 0; i < data.length; i++) {
    if (data[i] == '(') {
      pos++
    } else if (data[i] == ')') {
      pos--
    }

    if (pos == -1) {
      output = i + 1
      break
    }
  }

  return output
}

console.assert( part1('(())')    ==  0 )
console.assert( part1('()()')    ==  0 )
console.assert( part1('(((')     ==  3 )
console.assert( part1('(()(()(') ==  3 )
console.assert( part1('))(((((') ==  3 )
console.assert( part1('())')     == -1 )
console.assert( part1('))(')     == -1 )
console.assert( part1(')))')     == -3 )
console.assert( part1(')())())') == -3 )

console.assert( part2(')')     == 1 )
console.assert( part2('()())') == 5 )

console.log( `
  Advent of code 2015 #01
  Part1: ${part1(data)}
  Part2: ${part2(data)}
` )