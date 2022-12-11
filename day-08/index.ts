function getHiddenTrees(trees: number[][]): number[][] {
  const hiddenTrees: number[][] = []

  for (let y = 0; y < trees.length; y++) {
    for (let x = 0; x < trees[y].length; x++) {
      if (
        trees.reduce((above, row, i) => i < y ? [...above, row[x]] : above, []).some((val) => val >= trees[y][x]) &&
        trees[y].slice(x+1, trees[y].length).some((val) => val >= trees[y][x]) &&
        trees.reduce((below, row, i) => i > y ? [...below, row[x]] : below, []).some((val) => val >= trees[y][x]) &&
        trees[y].slice(0, x).some((val) => val >= trees[y][x]) 
      ) {
        hiddenTrees.push([y, x])
      }
    }
  }

  return hiddenTrees
}

export function part1(input: string): number {
  const trees = input.split('\n').map(line => Array.from(line, Number))
  return trees.flat().length - getHiddenTrees(trees).length
}