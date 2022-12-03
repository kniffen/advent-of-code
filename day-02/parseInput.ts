export default function parseInput(input: string) {
  return input.split('\n').map(line => line.split(' '))
}