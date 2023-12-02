const path  = require('path')
const fs    = require('fs')

const data = fs.readFileSync(path.resolve(__dirname, '../data/2015-03.txt'), 'utf8')

function part1(input) {
  let pos = 0
  const visited = [0]

  input.split('').forEach(dir => {
    switch (dir) {
      case '<':
        pos--
        break
      case '>':
        pos++
        break
      case '^':
        pos -= input.length
        break
      case 'v':
        pos += input.length
        break
    }

    if (!visited.includes(pos)) visited.push(pos)
  })

  return visited.length
}

function part2(input) {
  let pos = [0, 0]
  const visited = [0]

  input.split('').forEach((dir, i) => {
    switch (dir) {
      case '<':
        pos[i % 2]--
        break
      case '>':
        pos[i % 2]++
        break
      case '^':
        pos[i % 2] -= input.length
        break
      case 'v':
        pos[i % 2] += input.length
        break
    }

    if (!visited.includes(pos[i % 2])) visited.push(pos[i % 2])
  })

  return visited.length
}

console.clear()

console.log( 'Part 1 tests' )
console.assert( part1('>')          == 2 )
console.assert( part1('^>v<')       == 4 )
console.assert( part1('^v^v^v^v^v') == 2 )

console.log( 'Part 2 tests' )
console.assert( part2('^v')         == 3 )
console.assert( part2('^>v<')       == 3 )
console.assert( part2('^v^v^v^v^v') == 11 )

console.log( `
Advent of code 2015 #03
Part1: ${part1(data)}
Part2: ${part2(data)}
` )