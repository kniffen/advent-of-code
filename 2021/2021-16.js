/**
 * Advent of code 2021
 * Day 16
 */

const path   = require('path')
const fs     = require('fs')
const assert = require('assert')

const data = fs.readFileSync(path.resolve(__dirname, './2021-16.txt'), 'utf8')

function hexToBinary(hex) {
  return hex.split('').map(c => parseInt(c, 16).toString(2).padStart(4, '0').split('').map(Number)).flat()
}

function parsePacket(bin) {
  let size         = bin.length
  let literalValue = null

  const subPackets = []
  const version    = parseInt(bin.splice(0, 3).join(''), 2)
  const type       = parseInt(bin.splice(0, 3).join(''), 2)

  if (4 === type) {
    const groups =
      bin
        .reduce((groups, v, i, arr) => (0 === groups[groups.length - 1]?.[0] || 0) ? groups : [...groups, arr.splice(0, 5)], [])
        .map(arr => arr.splice(1, arr.length))
    
    literalValue = parseInt(groups.flat().join(''), 2)

  } else {
    const lengthTypeID = parseInt(bin.splice(0, 1)[0], 2)
    
    if (0 === lengthTypeID) {
      const totalLength = parseInt(bin.splice(0, 15).join(''), 2)

      let length = 0
      while (length < totalLength) {
        const packet = parsePacket(bin)
        length += packet.size
        subPackets.push(packet)
      }

    } else if (1 === lengthTypeID) {
      const packetCount = parseInt(bin.splice(0, 11).join(''), 2)

      for (let i = 0; i < packetCount; i++) {
        subPackets.push(parsePacket(bin))
      }

    }
  }
  
  const literalValues = subPackets.map(packet => packet.literalValue)
  switch (type) {
    case 0:
      literalValue = literalValues.reduce((total, value) => total+value, 0)
      break
    case 1:
      literalValue = literalValues.reduce((total, value) => total*value, 1)
      break
    case 2:
      literalValue = literalValues.sort((a, b) => a - b)[0]
      break
    case 3:
      literalValue = literalValues.sort((a, b) => b - a)[0]
      break
    case 5:
      literalValue = literalValues[0] > literalValues[1] ? 1 : 0
      break
    case 6:
      literalValue = literalValues[0] < literalValues[1] ? 1 : 0
      break
    case 7:
      literalValue = literalValues[0] == literalValues[1] ? 1 : 0
      break
  }

  size -= bin.length

  return {
    version,
    type,
    size,
    literalValue,
    subPackets,
  }
}

function part1(hex) {
  const bin    = hexToBinary(hex)
  const packet = parsePacket(bin)

  const sumVersions = (packet) => packet.subPackets.reduce((total, packet) => total+sumVersions(packet), packet.version)
  
  return sumVersions(packet)
}

function part2(hex) {
  const bin    = hexToBinary(hex)
  const packet = parsePacket(bin)

  return packet.literalValue
}

const testData = [
  'D2FE28',
  '38006F45291200',
  'EE00D40C823060',
  '8A004A801A8002F478',
  '620080001611562C8802118E34',
  'C0015000016115A2E0802F182340',
  'A0016C880162017C3686B18A3D4780',

  'C200B40A82',
  '04005AC33890',
  '880086C3E88112',
  'CE00C43D881120',
  'D8005AC2A8F0',
  'F600BC2D8F',
  '9C005AC2F8F0',
  '9C0141080250320F1802104A08',
]

assert.equal(part1(testData[0]), 6)
assert.equal(part1(testData[1]), 9)
assert.equal(part1(testData[2]), 14)
assert.equal(part1(testData[3]), 16)
assert.equal(part1(testData[4]), 12)
assert.equal(part1(testData[5]), 23)
assert.equal(part1(testData[6]), 31)

assert.equal(part2(testData[7]),  3)
assert.equal(part2(testData[8]), 54)
assert.equal(part2(testData[9]),  7)
assert.equal(part2(testData[10]), 9)
assert.equal(part2(testData[11]), 1)
assert.equal(part2(testData[12]), 0)
assert.equal(part2(testData[13]), 0)
assert.equal(part2(testData[14]), 1)

console.log(`
Advent of code 2021 #16

Part 1: ${part1(data)}
Part 2: ${part2(data)}
`)
