export default function part2(input: string) {
  return input.split('').findIndex((c, i, s) => 13 < s.slice(i, i+14).reduce((s, c) => s.includes(c) ? s : [...s, c],[]).length) + 14
}