import path from 'path'
import fs from 'fs'

import part1 from './part1'
import part2 from './part2'

describe('Day 04', function() {
  const input = fs.readFileSync(path.resolve(__dirname, './testInput.txt'), 'utf8')
  
  it('part 1', () => expect(part1(input)).toEqual(2))
  it('part 2', () => expect(part2(input)).toEqual(4))
})