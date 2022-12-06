import part1 from './part1'

describe('Day 06', function() {
  it('part 1', () => {
    expect(part1('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toEqual(7)
    expect(part1('bvwbjplbgvbhsrlpgdmjqwftvncz')).toEqual(5)
    expect(part1('nppdvjthqldpwncqszvftbrmjlhg')).toEqual(6)
    expect(part1('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toEqual(10)
    expect(part1('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toEqual(11)
  })
})