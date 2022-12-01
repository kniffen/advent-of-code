import parseInput from './parseInput'

export default function part1(input: string) {
  return parseInput(input).reduce((high, curr) => {
      const totCal = curr.reduce((tot, cal) => tot+cal, 0)
      return (high < totCal) ? totCal : high
    }, 0)
}