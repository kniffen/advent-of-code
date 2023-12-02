/**
 * Advent of code 2021
 * Day 12
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data =
  fs.readFileSync(path.resolve(__dirname, './2021-12.txt'), 'utf8')
    .split('\n')
    .map(str => str.split('-'))

function parseNodes(input) {
  const parsedNodes = input.reduce((nodes, [ source, destination ]) => {
    nodes[source]      = nodes[source]      || []
    nodes[destination] = nodes[destination] || []

    nodes[source].push(destination)
    nodes[destination].push(source)

    return nodes
  }, [])

  return parsedNodes
}
function part1(input) {
  const nodes = parseNodes(input)

  const traverse = (node, seenNodes = [node]) => {
    if ('end' === node) return [seenNodes]
    
    return nodes[node].reduce((paths, connection) => {
      if (connection.match(/[A-Z]+/g) || !seenNodes.includes(connection))
        traverse(connection, [...seenNodes, connection]).forEach(node_ => paths.push(node_))

      return paths
    }, [])
  }

  return traverse('start').length
}

function part2(input) {
  const nodes = parseNodes(input)

  const canVisit = (node, path) => {
    if (node.match(/[A-Z]+/g)) return true

    const count =
      path
        .filter(node => node.match(/[a-z]+/g))
        .reduce((count, node) => {
          const index = count.findIndex(n => n.node === node)

          count[index >= 0 ? index : count.length] = {node, count: count[index]?.count + 1 || 1}
          
          return count
        }, [])
        
    if ('start' === node) return (count.find(n => n.node === node)?.count || 0) < 1
    if ('end'   === node) return (count.find(n => n.node === node)?.count || 0) < 1
    
    const twosAllowed = count.filter(n => !['start', 'end'].includes(n.node) && n.count > 1).length < 1

    if (!twosAllowed && path.filter(n => n === node).length < 1) return true
    if (twosAllowed  && path.filter(n => n === node).length < 2) return true
    
    return false
  }

  const traverse = (node, path = [node]) => {
    if ('end' === node) return [path]
    
    return nodes[node].reduce((paths, connection) => {
      if (canVisit(connection, path))
        traverse(connection, [...path, connection]).forEach(node => paths.push(node))

      return paths
    }, [])
  }

  return traverse('start').length
}

const testData = [
`start-A
start-b
A-c
A-b
b-d
A-end
b-end`,

`dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`,

`fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`
].map(test => test.split('\n').map(str => str.split('-')))

assert.equal(part1(testData[0]), 10)
assert.equal(part1(testData[1]), 19)
assert.equal(part1(testData[2]), 226)

assert.equal(part2(testData[0]), 36)
assert.equal(part2(testData[1]), 103)
assert.equal(part2(testData[2]), 3509)

console.log(`
Advent of code 2021 #12

Part 1: ${part1(data)}
Part 2: ${part2(data)}
`)
