export default function parseInput(input: string) {
  return input
    .split('\n')
    .map(line => line.match(/\d+/g).map(n => parseInt(n)))
    .map(arr => [
      arr.slice(0, arr.length / 2),
      arr.slice(-(arr.length / 2))
    ])
}