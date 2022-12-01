export default function parseInput(input: string) {
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