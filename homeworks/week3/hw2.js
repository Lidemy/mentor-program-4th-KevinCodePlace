const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function judgedigit(i) {
  let digit = 1;
  let itmp = i;
  while (itmp >= 10) {
    itmp /= 10;
    digit += 1;
  }
  return digit;
}

function isnarc(number, digit) {
  let sum = 0;
  let numtemp = number;
  let remain;
  for (let i = 1; i <= digit; i += 1) {
    remain = numtemp % 10;
    numtemp = Math.floor(numtemp / 10);
    sum += remain ** digit;
  }
  if (sum === number) return true;
  return false;
}

function solve(input) {
  const tmp = input[0].split(' ');
  const N = Number(tmp[0]);
  const M = Number(tmp[1]);

  for (let i = N; i <= M; i += 1) {
    const digit = judgedigit(i);
    if (isnarc(i, digit) === true) {
      console.log(i);
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
/* eslint linebreak-style: ["error", "windows"] */
