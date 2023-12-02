function parseInput(input: string) {
  return input.split('\n').map(row => {
    const [dir, amount] = row.split(' ');
    return { dir, amount: Number(amount) };
  });
}

export function part1(input: string): number {
  const instructions = parseInput(input);

  const headPos = [0, 0];
  const tailPos = [0, 0];
  const tailHistory: { coord: number[], visits: number; }[] = [];

  for (const { dir, amount } of instructions) {
    for (let i = 0; i < amount; i++) {
      switch (dir) {
        case 'R':
          headPos[0]++;
          break;
        case 'L':
          headPos[0]--;
          break;
        case 'U':
          headPos[1]--;
          break;
        case 'D':
          headPos[1]++;
          break;
      }

      const distX = headPos[0] - tailPos[0];
      const distY = headPos[1] - tailPos[1];
      const distXAbs = Math.abs(headPos[0] - tailPos[0]);
      const distYAbs = Math.abs(headPos[1] - tailPos[1]);

      if (distXAbs > 1 || distYAbs > 1) {
        tailPos[0] += 0 === distX ? 0 : distX / distXAbs;
        tailPos[1] += 0 === distY ? 0 : distY / distYAbs;
      }

      const existingPos = tailHistory.find(({ coord }) => coord[0] === tailPos[0] && coord[1] === tailPos[1]);
      if (existingPos) {
        existingPos.visits++;
      } else {
        tailHistory.push({ coord: [...tailPos], visits: 1 });
      }
    }
  }

  return tailHistory.length;
}
