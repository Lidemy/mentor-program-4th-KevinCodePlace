const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function isPrime(num) {
  if (num === 1) return false;
  for (let i = 2; i < num; i += 1) {
    if ((num % i) === 0) {
      return false;
    }
  }
  return true;
}
function solve(oldinput) {
  let input;
  for (let i = 1; i < oldinput.length; i += 1) {
    input = Number(oldinput[i]);
    console.log(isPrime(input) ? 'Prime' : 'Composite');
  }
}
rl.on('close', () => {
  solve(lines);
});
/* eslint linebreak-style: ["error", "windows"] */
