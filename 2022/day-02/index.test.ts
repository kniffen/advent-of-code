import { part1, part2 } from './index'

describe('Day 02', function() {
  const testInput =
`A Y
B X
C Z`
  
  it('part 1', () => expect(part1(testInput)).toEqual(15))
  it('part 2', () => expect(part2(testInput)).toEqual(12))
})