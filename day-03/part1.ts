import parseInput from './parseInput'

export default function part1(input: string) {
  return parseInput(input)
    .map(sack => sack.split('').map(c => c.charCodeAt(0)))
    .map(sack => [
      sack.slice(0, sack.length / 2),
      sack.slice(sack.length / 2, sack.length)
    ])
    .reduce((priorities: number[], [ compartmentA, compartmentB ]) =>
      [compartmentA.find(charCode => compartmentB.includes(charCode)), ...priorities]
    , [])
    .reduce((sum, charCode) =>
      sum + (charCode > 96 ? charCode - 96 : charCode - 38)
    , 0)
}