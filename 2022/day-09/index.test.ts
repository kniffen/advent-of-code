import { part1 } from './index';

describe('Day 09', function () {
  const testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

  it('part 1', () => expect(part1(testInput)).toEqual(13));
});