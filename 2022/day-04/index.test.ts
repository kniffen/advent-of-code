import { part1, part2 } from './index'

describe('Day 04', function() {
  const testInput =
`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

  it('part 1', () => expect(part1(testInput)).toEqual(2))
  it('part 2', () => expect(part2(testInput)).toEqual(4))
})