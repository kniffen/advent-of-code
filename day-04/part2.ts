import parseInput from './parseInput'

export default function part2(input: string) {
  return parseInput(input)
    .map(pair => pair.map(([ a, b ]) => (new Array(b - a + 1).fill(0).map((v, i) => a + i))))
    .reduce((count, [ a, b ]) => a.find(c => b.includes(c)) ? count + 1 : count, 0)
}