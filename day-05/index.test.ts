import path from 'path'
import fs from 'fs'

import part1 from './part1'

describe('Day 05', function() {
  const input = fs.readFileSync(path.resolve(__dirname, './testInput.txt'), 'utf8')
  
  it('part 1', () => expect(part1(input)).toEqual('CMZ'))
})