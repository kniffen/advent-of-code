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
  Z: 3
}

export default function part2(input: string) {
  return parseInput(input).reduce((total, [ p1, res ]) => {
    const p2 = (rps[p1] + rps[res]) % 3 + 1
    return total + p2 + (rps[res] - 1) * 3
  }, 0)
}