/// <reference path="../typings/main.d.ts" />
var rl = require('readline-sync');
var result;
var answer;
var highest = 100;
var lowest = 0;
var guess;
while (result === undefined) {
    guess = ~~((highest - lowest) / 2 + lowest);
    answer = rl.question("Is the your number same [*], higher [h] or lower [l] than " + guess + "? ");
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
console.log("Your number is " + result);
