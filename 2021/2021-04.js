/**
 * Advent of code 2021
 * Day 4
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = fs.readFileSync(path.resolve(__dirname, './2021-04.txt'), 'utf8').split('\n')
const inputSequence = data[0].split(',').map(n => parseInt(n))
const inputBoards = []

let board = []
for (let i = 2; i < data.length; i++) {
  if ('' === data[i]) {
    inputBoards.push(board.slice())
    board = []
    continue
  }
  board.push(data[i].split(' ').filter(n => '' !== n).map(n => parseInt(n)))
}

function part1(sequence, boards) {
  boards = boards.map(board => board.map(row => row.map(n => ({n, hit: false}))))
  
  let n      = null
  let winner = null
  for (n of sequence) {
    for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
      const board = boards[boardIndex]
      const rowIndex = board.findIndex(row => row.find(cell => cell.n === n))
      
      if (rowIndex < 0) continue

      const row    = board[rowIndex]
      const column = []

      const columnIndex = row.findIndex(cell => cell.n === n)

      board[rowIndex][columnIndex].hit = true
      
      for (let i = 0; i < board.length; i++)
        column.push(board[i][columnIndex])

      if (!row.some(cell => !cell.hit) || !column.some(cell => !cell.hit)) {
        winner = boardIndex
        break
      }
    }
    if (winner) break
  }

  const sum =
    boards[winner]
      .flat()
      .filter(cell => !cell.hit)
      .map(cell => cell.n)
      .reduce((a, b) => a + b)

  return sum * n
}

function part2(sequence, boards) {
  boards = boards.map(board => board.map(row => row.map(n => ({n, hit: false}))))
  
  let n       = null
  let winners = []
  for (n of sequence) {
    for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
      if (winners.includes(boardIndex)) continue

      const board = boards[boardIndex]
      const rowIndex = board.findIndex(row => row.find(cell => cell.n === n))
      
      if (rowIndex < 0) continue

      const row    = board[rowIndex]
      const column = []

      const columnIndex = row.findIndex(cell => cell.n === n)

      board[rowIndex][columnIndex].hit = true
      
      for (let i = 0; i < board.length; i++)
        column.push(board[i][columnIndex])

      if (!row.some(cell => !cell.hit) || !column.some(cell => !cell.hit))
        winners.push(boardIndex)
    }

    if (winners.length >= boards.length) break
  }

  const sum =
    boards[winners[winners.length - 1]]
      .flat()
      .filter(cell => !cell.hit)
      .map(cell => cell.n)
      .reduce((a, b) => a + b)

  return sum * n
}

const testSequence = [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 21, 22, 18, 20, 8, 19, 3, 26, 1]
const testBoards = [
  [
    [22, 13, 17, 11,  0],
    [ 8,  2, 23,  4, 24],
    [21,  9, 14, 16,  7],
    [ 6, 10,  3, 18,  5],
    [ 1, 12, 20, 15, 19],
  ],
  [
    [ 3, 15,  0,  2, 22],
    [ 9, 18, 13, 17,  5],
    [19,  8,  7, 25, 23],
    [20, 11, 10, 24,  4],
    [14, 21, 16, 12,  6],
  ],
  [
    [14, 21, 17, 24,  4],
    [10, 16, 15,  9, 19],
    [18,  8, 23, 26, 20],
    [22, 11, 13,  6,  5],
    [ 2,  0, 12,  3,  7],
  ]
]

assert.equal(part1(testSequence, testBoards), 4512)
assert.equal(part2(testSequence, testBoards), 1924)

console.log(`
Advent of code 2021 #04

Part 1: ${part1(inputSequence, inputBoards)}
Part 2: ${part2(inputSequence, inputBoards)}
`)