const path  = require('path')
const fs    = require('fs')

const data = fs.readFileSync(path.resolve(__dirname, '../data/2015-02.txt'), 'utf8')

function part1(input) {
  let output = 0
  const data = input.split('\n')

  data.forEach(dim => {
    const [ l, w, h ] = dim.split('x')
    const sides = [l*w, w*h, h*l]
    
    sides.sort((a, b) => a - b)

    output += 2 * sides[0]
    output += 2 * sides[1]
    output += 2 * sides[2]
    output += sides[0]
  })

  return output
}

function part2(input) {
  let output = 0
  const data = input.split('\n')

  data.forEach(box => {
    const dims = box.split('x')
    dims.sort((a, b) => a - b)

    output += parseInt(dims[0]) + parseInt(dims[0])
    output += parseInt(dims[1]) + parseInt(dims[1])
    output += dims[0]*dims[1]*dims[2]
  })

  return output
}

console.log( 'Part 1 tests' )
console.assert( part1('2x3x4')  == 58 )
console.assert( part1('1x1x10') == 43 )

console.log( 'Part 2 tests' )
console.assert( part2('2x3x4')  == 34 )
console.assert( part2('1x1x10') == 14 )

console.log( `
  Advent of code 2015 #02
  Part1: ${part1(data)}
  Part2: ${part2(data)}
` )