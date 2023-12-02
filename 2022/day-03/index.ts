export function part1(input: string) {
  return input
    .split('\n')
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

export function part2(input: string) {
  return input
    .split('\n')
    .map(sack => sack.split('').map(c => c.charCodeAt(0)))
    .reduce((sacks, sack, index, arr) => 
      0 === index % 3 ? [[arr[index], arr[index+1], arr[index+2]], ...sacks] : sacks
    , [])
    .map((sacks: number[][]) => sacks[0].find(charCode => sacks[1].includes(charCode) && sacks[2].includes(charCode)))
    .reduce((sum, charCode) =>
      sum + (charCode > 96 ? charCode - 96 : charCode - 38)
    , 0)
}