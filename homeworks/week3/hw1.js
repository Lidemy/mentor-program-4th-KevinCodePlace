const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function solve(input) {
  const floor = Number(input[0]);
  let ans = '';
  for (let i = 1; i <= floor; i += 1) {
    ans += '*'.repeat(i);
    console.log(ans);
    /* eslint linebreak-style: ["error", "windows"] */
    ans = '';
    /* eslint linebreak-style: ["error", "windows"] */
  }
}


rl.on('close', () => {
  solve(lines);
});
