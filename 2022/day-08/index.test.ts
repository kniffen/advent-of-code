import { part1, part2 } from './index'

describe('Day 08', function() {
  const testInput =
`30373
25512
65332
33549
35390`

  it('part 1', () => expect(part1(testInput)).toEqual(21))
  it('part 2', () => expect(part2(testInput)).toEqual(8))

})