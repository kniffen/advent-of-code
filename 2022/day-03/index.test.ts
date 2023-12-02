import { part1, part2 } from './index'

describe('Day 03', function() {
  const testInput =
`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

  it('part 1', () => expect(part1(testInput)).toEqual(157))
  it('part 2', () => expect(part2(testInput)).toEqual(70))
})