function parseInput(input: string) {
  const elves: number[][] = []
  const lines = input.split('\n')
  let index = 0

  for (const line of lines) {
    if ('' === line) {
      index++
      continue
    }

    if (!elves[index]) elves[index] = []
    elves[index].push(parseInt(line))
  }

  return elves
}

export function part1(input: string) {
  return parseInput(input).reduce((high, curr) => {
      const totCal = curr.reduce((tot, cal) => tot+cal, 0)
      return (high < totCal) ? totCal : high
    }, 0)
}

export function part2(input: string) {
  const totals = parseInput(input).map(elf => elf.reduce((tot, cal) => tot+cal, 0))
  totals.sort((a, b) => b - a)
  
  return totals[0] + totals[1] + totals[2]
}