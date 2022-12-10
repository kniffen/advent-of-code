import { part1, part2 } from './index'

describe('Day 06', function() {
  it('part 1', () => {
    expect(part1('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toEqual(7)
    expect(part1('bvwbjplbgvbhsrlpgdmjqwftvncz')).toEqual(5)
    expect(part1('nppdvjthqldpwncqszvftbrmjlhg')).toEqual(6)
    expect(part1('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toEqual(10)
    expect(part1('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toEqual(11)
  })

  it('part 2', () => {
    expect(part2('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toEqual(19)
    expect(part2('bvwbjplbgvbhsrlpgdmjqwftvncz')).toEqual(23)
    expect(part2('nppdvjthqldpwncqszvftbrmjlhg')).toEqual(23)
    expect(part2('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toEqual(29)
    expect(part2('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toEqual(26)
  })
})