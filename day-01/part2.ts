import parseInput from './parseInput'

export default function part2(input: string) {
  const totals = parseInput(input).map(elf => elf.reduce((tot, cal) => tot+cal, 0))
  totals.sort((a, b) => b - a)
  
  return totals[0] + totals[1] + totals[2]
}