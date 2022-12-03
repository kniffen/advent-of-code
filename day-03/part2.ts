import parseInput from './parseInput'

export default function part2(input: string) {
  return parseInput(input)
    .map(sack => sack.split('').map(c => c.charCodeAt(0)))
    .reduce((sacks, sack, index, arr) => 
      0 === index % 3 ? [[arr[index], arr[index+1], arr[index+2]], ...sacks] : sacks
    , [])
    .map((sacks: number[][]) => sacks[0].find(charCode => sacks[1].includes(charCode) && sacks[2].includes(charCode)))
    .reduce((sum, charCode) =>
      sum + (charCode > 96 ? charCode - 96 : charCode - 38)
    , 0)
}