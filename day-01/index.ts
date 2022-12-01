import path from 'path'
import fs from 'fs'

import part1 from './part1'

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8')

console.log('Advent of Code 2022\nDay 01')
console.log('---------------------------')
console.log(`Part 1: ${part1(input)}`)