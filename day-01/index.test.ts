import { part1, part2 } from './index'

describe('day 01', function() {
  const testInput = 
`1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`
  
  it('part 1', () => expect(part1(testInput)).toEqual(24000))
  it('part 2', () => expect(part2(testInput)).toEqual(45000))
})