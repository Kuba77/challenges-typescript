var util = require('util');
var test_data = ['4, 2, 8', '6, 2, 12', '6, 2, 3', '9, 12, 108', '4, 16, 64'];
var operations = [
    function (a, b) { return a + b; },
    function (a, b) { return a * b; },
    function (a, b) { return a - b; },
    function (a, b) { return a / b; }
];
var operations_script = [
    '%d + %d = %d',
    '%d * %d = %d',
    '%d - %d = %d',
    '%d / %d = %d',
];
for (var _i = 0, test_data_1 = test_data; _i < test_data_1.length; _i++) {
    var input = test_data_1[_i];
    var unparsed_numbers = input.split(', ');
    var combinations = [];
    for (var _a = 0, unparsed_numbers_1 = unparsed_numbers; _a < unparsed_numbers_1.length; _a++) {
        var x = unparsed_numbers_1[_a];
        for (var _b = 0, unparsed_numbers_2 = unparsed_numbers; _b < unparsed_numbers_2.length; _b++) {
            var y = unparsed_numbers_2[_b];
            if (x == y)
                continue;
            for (var _c = 0, unparsed_numbers_3 = unparsed_numbers; _c < unparsed_numbers_3.length; _c++) {
                var z = unparsed_numbers_3[_c];
                if (x == z || y == z)
                    continue;
                combinations.push([~~x, ~~y, ~~z]);
            }
        }
    }
    for (var i in operations) {
        for (var _d = 0, combinations_1 = combinations; _d < combinations_1.length; _d++) {
            var numbers = combinations_1[_d];
            if (operations[~~i](numbers[0], numbers[1]) == numbers[2])
                console.log(util.format(operations_script[~~i], numbers[0], numbers[1], numbers[2]));
        }
    }
}
