import parseInput from './parseInput'

export default function part1(input: string) {
  return parseInput(input)
    .map(pair => pair.map(([ a, b ]) => (new Array(b - a + 1).fill(0).map((v, i) => String.fromCharCode(a + i))).join('')))
    .reduce((count, [ a, b ]) => a.includes(b) || b.includes(a) ? count + 1 : count, 0)
}