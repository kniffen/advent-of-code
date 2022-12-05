import path from 'path'
import fs from 'fs'

import part1 from './part1'
import part2 from './part2'

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8')

console.log('Advent of Code 2022: Day 05')
console.log('---------------------------')
console.log(`Part 1: ${part1(input)}`)
console.log(`Part 2: ${part2(input)}`)