function getMarker(input: string, distinct: number) {
  return input.split('')
              .findIndex((c, i, s) => distinct <= s.slice(i, i + distinct)
                                                   .reduce((s, c) => s.includes(c) ? s : [...s, c], [])
                                                   .length) + distinct
}

export const part1 = (input: string) => getMarker(input, 4)
export const part2 = (input: string) => getMarker(input, 14)