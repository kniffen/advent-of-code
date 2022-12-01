import path from 'path'
import fs from 'fs'

import part1 from './part1'

describe('day 01', function() {
  describe('part 1', function() {
    it('Should find the elf carrying the most calories', function() {
      const input = fs.readFileSync(path.resolve(__dirname, './testInput.txt'), 'utf8')
      const elf = part1(input)

      expect(elf).toEqual(24000)
    })
  })
})