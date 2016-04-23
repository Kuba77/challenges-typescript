/// <reference path="../typings/main.d.ts" />
const util = require('util');

var test_data: string[] = ['4, 2, 8', '6, 2, 12', '6, 2, 3', '9, 12, 108', '4, 16, 64'];

var operations = [
  (a: number, b:number): number => a + b,
  (a: number, b:number): number => a * b,
  (a: number, b:number): number => a - b,
  (a: number, b:number): number => a / b
];

var operations_script: any[] = [
  '%d + %d = %d',
  '%d * %d = %d',
  '%d - %d = %d',
  '%d / %d = %d',
]

for (var input of test_data) {
  var unparsed_numbers: string[] = input.split(', ');
  var combinations: number[][] = [];

  for (var x of unparsed_numbers) {
    for (var y of unparsed_numbers) {
      if (x == y)
        continue;

      for (var z of unparsed_numbers) {
        if (x == z || y == z)
          continue;

        combinations.push([~~x, ~~y, ~~z])
      }
    }
  }

  for (var i in operations) {
    for (var numbers of combinations)
      if (operations[~~i](numbers[0], numbers[1]) == numbers[2])
        console.log(util.format(operations_script[~~i], numbers[0], numbers[1], numbers[2]));
  }
}
