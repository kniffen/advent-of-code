export default function part1(input: string) {
  return input.split('').findIndex((c, i, s) => 3 < s.slice(i, i+4).reduce((s, c) => s.includes(c) ? s : [...s, c],[]).length) + 4
}