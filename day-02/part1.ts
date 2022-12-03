import parseInput from './parseInput'

interface RPS {
  [key: string]: number
}

const rps: RPS = {
  A: 1,
  X: 1,
  B: 2,
  Y: 2,
  C: 3,
  Z: 3,
}

export default function part1(input: string) {
  return parseInput(input).reduce((total, [ p1, p2 ]) =>
    total + rps[p2] + (rps[p1] % 3 + 1 === rps[p2] ? 6 : rps[p1] === rps[p2] ? 3 : 0)
  , 0)
}