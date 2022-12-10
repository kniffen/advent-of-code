function parseInput(input: string) {
  return input
    .split('\n')
    .map(line => line.match(/\d+/g).map(n => parseInt(n)))
    .map(arr => [
      arr.slice(0, arr.length / 2),
      arr.slice(-(arr.length / 2))
    ])
}

export function part1(input: string) {
  return parseInput(input)
    .map(pair => pair.map(([ a, b ]) => (new Array(b - a + 1).fill(0).map((v, i) => String.fromCharCode(a + i))).join('')))
    .reduce((count, [ a, b ]) => a.includes(b) || b.includes(a) ? count + 1 : count, 0)
}

export function part2(input: string) {
  return parseInput(input)
    .map(pair => pair.map(([ a, b ]) => (new Array(b - a + 1).fill(0).map((v, i) => a + i))))
    .reduce((count, [ a, b ]) => a.find(c => b.includes(c)) ? count + 1 : count, 0)
}