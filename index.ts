import path from 'path'
import fs from 'fs'

async function init() {
  console.log('Advent of Code 2022')

  for (let i = 0; i < 25; i++) {
    try {
      const num = i < 10 ? `0${i+1}` : i+1
      const day = await import(`./day-${num}`)
      
      if (!day) continue

      const input = fs.readFileSync(path.resolve(__dirname, `day-${num}/input.txt`), 'utf8')

      console.log(`
        Day: ${num}
        ---------------------------
        Part 1: ${day.part1 ? day.part1(input) : 'Unknown'}
        Part 2: ${day.part2 ? day.part2(input) : 'Unknown'}
      `)
    } catch(err) {
      /* ignore */
    }
  }
}

init()