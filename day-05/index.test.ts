import path from 'path'
import fs from 'fs'

import getTopCrates from './getTopCrates'

describe('Day 05', function() {
  const input = fs.readFileSync(path.resolve(__dirname, './testInput.txt'), 'utf8')
  
  it('part 1', () => expect(getTopCrates(input)).toEqual('CMZ'))
  it('part 2', () => expect(getTopCrates(input, true)).toEqual('MCD'))
})