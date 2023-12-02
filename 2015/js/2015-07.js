/**
 * Advent of code 2015
 * Day 7
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = fs.readFileSync(path.resolve(__dirname, '../data/2015-07.txt'), 'utf8').split('\r\n')

function parseWires(input) {
  const wires = {}

  for (const entry of input) {
    let [str, a, bitwise, b, target] = entry.match(/^(?:([a-z\d]+) )?(?:(AND|OR|LSHIFT|RSHIFT|NOT) )?([a-z\d]+) -> ([a-z]+)$/)
    
    wires[target] = {
      args: [
        isNaN(a) ? a : Number(a),
        isNaN(b) ? b : Number(b),
      ],
      bitwise: bitwise,
      value: null,
    }
  }

  return wires
}

function resolveWire(wires, id) {
  const wire = wires[id]

  if (!wire) return
  if (null !== wire.value) return wire

  if (!wire.bitwise) {
    wire.value = isNaN(wire.args[1]) ? resolveWire(wires, wire.args[1])?.value : wire.args[1]
    return wire
  }

  const a = isNaN(wire.args[0]) ? resolveWire(wires, wire.args[0])?.value : wire.args[0]
  const b = isNaN(wire.args[1]) ? resolveWire(wires, wire.args[1])?.value : wire.args[1]

  switch (wire.bitwise) {
    case 'AND':
      wire.value = a & b
      break
    case 'OR':
      wire.value = a | b
      break
    case 'LSHIFT':
      wire.value = a << b
      break
    case 'RSHIFT':
      wire.value = a >> b
      break
    case 'NOT':
      wire.value = ~ b
      break
  }

  return wire
}

function part1(input, target) {
  const wires = parseWires(input)

  return resolveWire(wires, target).value & 65535
}

function part2(input, target) {
  let wires = parseWires(input)

  const value = resolveWire(wires, target).value

  wires = parseWires(input)
  
  wires.b.value = value
  
  return resolveWire(wires, target).value & 65535
}

const testData = ( 
`123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i`).split('\n')

assert.equal(part1(testData, 'd'), 72)
assert.equal(part1(testData, 'e'), 507)
assert.equal(part1(testData, 'f'), 492)
assert.equal(part1(testData, 'g'), 114)
assert.equal(part1(testData, 'h'), 65412)
assert.equal(part1(testData, 'i'), 65079)
assert.equal(part1(testData, 'x'), 123)
assert.equal(part1(testData, 'y'), 456)

console.log(`
Advent of code 2015 #07

Part 1: ${part1(data, 'a')}
Part 2: ${part2(data, 'a')}
`)