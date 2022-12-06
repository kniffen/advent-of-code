export default function getMarker(input: string, distinct: number) {
  return input.split('')
              .findIndex((c, i, s) => distinct <= s.slice(i, i + distinct)
                                                   .reduce((s, c) => s.includes(c) ? s : [...s, c], [])
                                                   .length) + distinct
}