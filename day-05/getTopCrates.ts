import parseInput from './parseInput'

export default function getTopCrates(input: string, canLoadMultiple = false) {
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