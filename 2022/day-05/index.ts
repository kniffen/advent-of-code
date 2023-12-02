function parseInput(input: string) {
  const [ stacks, instructions ] = input.split('\n\n')

  return {
    stacks: stacks.split('\n').slice(0, -1).map(line => line.split('').filter((v, i) => 0 === (i-1) % 4)),
    instructions: instructions.split('\n').map(line => line.match(/\d+/g).map(c => parseInt(c)))
  }
}

function getTopCrates(input: string, canLoadMultiple = false) {
  const { stacks, instructions } = parseInput(input)

  const reorderedStacks =
    stacks[0]
      .map((row, i) => stacks.map(row => row[i]))
      .map(column => column.filter((c) => ' ' !== c))

  instructions.forEach(([ count, from, to ]) => {
    const crates = reorderedStacks[from-1].splice(0, count)
    if (!canLoadMultiple) crates.reverse()
    reorderedStacks[to - 1] = crates.concat(reorderedStacks[to - 1])
  })

  return reorderedStacks.reduce((answer, column) => answer + column[0], '')
}

export const part1 = (input: string) => getTopCrates(input)
export const part2 = (input: string) => getTopCrates(input, true)