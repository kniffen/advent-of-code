import path from 'path'
import fs from 'fs'

import part1 from './part1'
import part2 from './part2'

describe('day 01', function() {
  const input = fs.readFileSync(path.resolve(__dirname, './testInput.txt'), 'utf8')
  
  describe('part 1', function() {
    it('Should find the elf carrying the most calories', function() {
      expect(part1(input)).toEqual(24000)
    })
  })

  describe('part 2', function() {
    it('Should find the total calories of the top 3 elves', function() {
      expect(part2(input)).toEqual(45000)
    })
  })
})