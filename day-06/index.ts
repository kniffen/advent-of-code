import path from 'path'
import fs from 'fs'

import getMarker from './getMarker'

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8')

console.log('Advent of Code 2022: Day 06')
console.log('---------------------------')
console.log(`Part 1: ${getMarker(input, 4)}`)
console.log(`Part 2: ${getMarker(input, 14)}`)