import parseInput from './parseInput'

export default function part1(input: string) {
  const { stacks, instructions } = parseInput(input)

  const reorderedStacks =
    stacks[0]
      .map((row, i) => stacks.map(row => row[i]))
      .map(column => column.filter((c) => ' ' !== c))

  instructions.forEach(([ count, from, to ]) =>
    reorderedStacks[to - 1] = reorderedStacks[from-1].splice(0, count).reverse().concat(reorderedStacks[to - 1])
  )

  return reorderedStacks.reduce((answer, column) => answer + column[0], '')
}