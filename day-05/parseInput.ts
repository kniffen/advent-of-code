export default function parseInput(input: string) {
  const [ stacks, instructions ] = input.split('\n\n')

  return {
    stacks: stacks.split('\n').slice(0, -1).map(line => line.split('').filter((v, i) => 0 === (i-1) % 4)),
    instructions: instructions.split('\n').map(line => line.match(/\d+/g).map(c => parseInt(c)))
  }
}