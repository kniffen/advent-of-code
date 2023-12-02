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

function getViewDistanceScore(trees: number[][], y: number, x: number): number {
  const directions = [
    trees.reduce((above, row, i) => i < y ? [...above, row[x]] : above, []),
    trees[y].slice(x+1, trees[y].length).reverse(),
    trees.reduce((below, row, i) => i > y ? [...below, row[x]] : below, []).reverse(),
    trees[y].slice(0, x)
  ]

  return directions.reduce(
    (sum, dir) => sum *= dir.reduce((dist, val, index) => val >= trees[y][x] ? dir.length-index : dist, dir.length),
    1
  )
}

export function part1(input: string): number {
  const trees = input.split('\n').map(line => Array.from(line, Number))
  return trees.flat().length - getHiddenTrees(trees).length
}

export function part2(input: string): number {
  const trees = input.split('\n').map(line => Array.from(line, Number))
  const viewDistances = trees.map((row, y) => row.map((val, x) => getViewDistanceScore(trees, y, x)))

  return viewDistances.flat().reduce((top, val) => val > top ? val : top, 0)
}