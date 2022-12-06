import path from 'path'
import fs from 'fs'

import part1 from './part1'
import part2 from './part2'

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8')

console.log(`
Advent of Code 2022: Day 01
---------------------------
Part 1: ${part1(input)}
Part 2: ${part2(input)}
`)