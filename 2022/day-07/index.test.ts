import { part1, part2 } from './index'

describe('Day 07', function() {
  const testInput = 
`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

  it('part 1', () => expect(part1(testInput)).toEqual(95437))
  it('part 2', () => expect(part2(testInput)).toEqual(24933642))

})