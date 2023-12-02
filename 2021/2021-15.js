/**
 * Advent of code 2021
 * Day 15
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = parseInput(fs.readFileSync(path.resolve(__dirname, './2021-15.txt'), 'utf8'))

function parseInput(input) {
  const arr     = input.split('\n').map(row => row.split('').map(Number))
  const columns = arr[0].length
  const rows    = arr.length

  return {
    columns,
    rows,
    grid: arr.flat()
  }
}

const getAdjacentNodes = (node, columns, rows) => {
  const row    = Math.floor(node / columns)
  const column = Math.floor(node % columns)

  const adjacent = [
    row    > 0           ? node - columns : -1, // top
    column < columns - 1 ? node + 1       : -1, // right
    row    < rows    - 1 ? node + columns : -1, // bottom    
    column > 0           ? node - 1       : -1, // left
  ].filter((node, i) => node > -1)
  
  return adjacent
}

function debugPrintPath({ grid, columns, rows }, path) {
  for (let y = 0; y < rows; y++) {
    const row = []

    for (let x = 0; x < columns; x++) {
      const node = x + y * columns
      row.push(!path.includes(node) ? '.' : grid[node])
    }

    console.log(row.join(''))
  }
}

function findShortestPath({ grid, columns, rows }, startNode, endNode) {
  const nodes = grid.map((value, index) => ({index, value, parent: null, distance: index === startNode ? 0 : Infinity}))
  const queue = nodes.slice()

  const loadingSteps = grid.length / 100

  while (queue.length > 0) {
    if (queue.length % loadingSteps === 0) {
      console.log(`Calculating path: ${Math.floor((1-queue.length/grid.length)*100)}%`)
    }

    // Find the node in queue with the shortest distance
    // This part need to be optimized, very slow
    let currentNode = queue[0]
    for (const node of queue) {
      if (node.distance < currentNode.distance)
        currentNode = node
    }

    // Quit if the end node was reached
    if (currentNode.index === endNode) break
   
    // update neighbouring nodes
    for (const index of getAdjacentNodes(currentNode.index, columns, rows)) {
      const adjacentNode = nodes[index]
      const distance     = currentNode.distance + adjacentNode.value

      if (distance < adjacentNode.distance) {
        adjacentNode.distance = distance
        adjacentNode.parent   = currentNode.index
      }
    }

    // Remove current node from the queue
    queue.splice(queue.findIndex(node => node.index === currentNode.index), 1)
  }

  // Create an array with just the path nodes
  const path = [endNode]
  while (path[path.length - 1] !== startNode) {
    path.push(nodes[path[path.length - 1]].parent)
  }

  return { path, nodes }
}

function part1(input) {
  const startNode = 0
  const endNode   = input.grid.length - 1

  const { nodes, path } = findShortestPath(input, startNode, endNode)
  
  // debugPrintPath(input, path)
  
  return nodes[endNode].distance
}

function part2({ grid, columns, rows }) {
  const input = {
    grid:    [],
    columns: columns * 5,
    rows:    rows    * 5,
  }

  input.grid.length = input.columns * input.rows
  input.grid.fill(0)

  const startNode = 0
  const endNode   = input.grid.length - 1

  // There's probably a better way of doing this
  // Maybe by not starting with a one-dimensional array
  for (let i = 0; i < input.grid.length; i++) {
    const row    = Math.floor(i / input.columns)
    const column = Math.floor(i % input.columns)
    const oldY   = row    % rows
    const oldX   = column % columns
    const offset = Math.floor(column / columns) + Math.floor(row / rows)
    const value  = grid[oldX + oldY * columns] + offset

    input.grid[i] = value > 9 ? value - 9 : value
  }

  const { nodes, path } = findShortestPath(input, startNode, endNode)

  //debugPrintPath(input, path)

  return nodes[endNode].distance
}

const testData = parseInput(
`1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`)

assert.equal(part1(testData), 40)
assert.equal(part2(testData), 315)

console.log(`
Advent of code 2021 #15

Part 1: ${part1(data)}
Part 1: ${part2(data)}
`)