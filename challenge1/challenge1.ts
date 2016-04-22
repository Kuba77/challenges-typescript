/// <reference path="../typings/main.d.ts" />

const rl = require('readline-sync');

var result: number;
var answer: string;

var highest: number = 100;
var lowest: number = 0;
var guess: number;

while (result === undefined) {
  guess = ~~((highest - lowest) / 2 + lowest);
  var answer: string = rl.question(`Is the your number same [*], higher [h] or lower [l] than ${guess}? `);
  switch (answer) {
    case 'h':
      lowest = guess + 1;
      break;
    case 'l':
      highest = guess - 1;
      break;
    default:
      result = guess;
  }
}

console.log(`Your number is ${result}`);