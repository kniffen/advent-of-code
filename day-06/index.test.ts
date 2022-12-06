import getMarker from './getMarker'

describe('Day 06', function() {
  it('part 1', () => {
    expect(getMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 4)).toEqual(7)
    expect(getMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 4)).toEqual(5)
    expect(getMarker('nppdvjthqldpwncqszvftbrmjlhg', 4)).toEqual(6)
    expect(getMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 4)).toEqual(10)
    expect(getMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4)).toEqual(11)
  })

  it('part 2', () => {
    expect(getMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14)).toEqual(19)
    expect(getMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 14)).toEqual(23)
    expect(getMarker('nppdvjthqldpwncqszvftbrmjlhg', 14)).toEqual(23)
    expect(getMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14)).toEqual(29)
    expect(getMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14)).toEqual(26)
  })
})