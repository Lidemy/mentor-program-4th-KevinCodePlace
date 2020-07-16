const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function play(A, B, K) {
  if (A === B) return 'DRAW';
  const alength = A.length;
  const blength = B.length;
  if (K === 1) {
    if (alength !== blength) {
      return (alength > blength) ? 'A' : 'B';
    }

    return (A > B) ? 'A' : 'B';
  }
  if (K === -1) {
    if (alength !== blength) {
      return (alength > blength) ? 'B' : 'A';
    }
    return (A > B) ? 'B' : 'A';
  }
  return 'Error';
}
function solve(input) {
  const playtimes = Number(input[0]);
  for (let i = 1; i <= playtimes; i += 1) {
    const round = input[i].split(' ');
    const [A, B, K] = [round[0], round[1], Number(round[2])];
    console.log(play(A, B, K));
  }
}

rl.on('close', () => {
  solve(lines);
});
/* eslint linebreak-style: ["error", "windows"] */
