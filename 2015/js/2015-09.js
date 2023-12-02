/**
 * Advent of code 2015
 * Day 9
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = fs.readFileSync(path.resolve(__dirname, '../data/2015-09.txt'), 'utf8').split('\n')

function generateRoutes(input) {
  const distances = input.map(entry => {
    const [str, source, destination, distance] = entry.match(/([a-z]+) to ([a-z]+) = (\d+)/i)
    return [source, destination, parseInt(distance)]
  })

  const locations = []
  for (const distance of distances) {
    if (!locations.includes(distance[0])) locations.push(distance[0])
    if (!locations.includes(distance[1])) locations.push(distance[1])
  }

  const setPermutations = (arr, permutations = [], length = arr.length) => {
    if (1 === length)
      permutations.push(arr.slice())

    for (let i = 0; i < length; i++) {
      setPermutations(arr, permutations, length - 1)

      if (length % 2) {
        [arr[0], arr[length - 1]] = [arr[length - 1], arr[0]]
      } else {
        [arr[i], arr[length - 1]] = [arr[length - 1], arr[i]]
      }
    }

    return permutations
  }

  const routes = setPermutations(locations).map(route => {
    route[route.length] = 0
    
    for (let i = 0; i < route.length - 2; i++) {
      const locations = [route[i], route[i + 1]]

      route[route.length - 1] += distances.find(distance => locations.includes(distance[0]) && locations.includes(distance[1]))[2]
    }

    return route
  })

  return routes
}

function part1(input) {
  const routes    = generateRoutes(input)
  const distances = routes.map(route => route[route.length - 1])

  distances.sort()

  return distances[0]
}

function part2(input) {
  const routes    = generateRoutes(input)
  const distances = routes.map(route => route[route.length - 1])

  distances.sort((a, b) => b - a)

  return distances[0]
}

const testData = [
  'London to Dublin = 464',
  'London to Belfast = 518',
  'Dublin to Belfast = 141',
]

assert.equal(part1(testData), 605)
assert.equal(part2(testData), 982)

console.log(`
Advent of code 2015 #09

Part 1: ${part1(data)}
Part 2: ${part2(data)}
`)