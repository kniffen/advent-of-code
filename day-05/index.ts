import path from 'path'
import fs from 'fs'

import getTopCrates from './getTopCrates'

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8')

console.log('Advent of Code 2022: Day 05')
console.log('---------------------------')
console.log(`Part 1: ${getTopCrates(input)}`)
console.log(`Part 2: ${getTopCrates(input, true)}`)