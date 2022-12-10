import { part1, part2 } from './index'

describe('Day 05', function() {
  const testInput =
`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`
  
  it('part 1', () => expect(part1(testInput)).toEqual('CMZ'))
  it('part 2', () => expect(part2(testInput)).toEqual('MCD'))
})