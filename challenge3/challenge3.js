var os = require('os');
var fs = require('fs');
var readline = require('readline');
var rd = readline.createInterface({
    input: fs.createReadStream('wordslist.txt'),
    output: process.stdout,
    terminal: false
});
var scrambled_words = ['mkeart', 'sleewa', 'edcudls', 'iragoge', 'usrlsle', 'nalraoci', 'nsdeuto', 'amrhat', 'inknsy', 'iferkna'];
var letters_lists = [];
for (var _i = 0, scrambled_words_1 = scrambled_words; _i < scrambled_words_1.length; _i++) {
    var word = scrambled_words_1[_i];
    letters_lists.push(word.split(''));
}
var correct_words = [];
rd.on('line', function (correct_word) {
    var correct_letters = correct_word.split('');
    for (var _i = 0, letters_lists_1 = letters_lists; _i < letters_lists_1.length; _i++) {
        var sorted_letters = letters_lists_1[_i];
        var used_letters = [];
        for (var _a = 0, correct_letters_1 = correct_letters; _a < correct_letters_1.length; _a++) {
            var correct_letter = correct_letters_1[_a];
            var matched = false;
            for (var i in sorted_letters) {
                if (used_letters.indexOf(i) !== -1)
                    continue;
                var sorted_letter = sorted_letters[~~i];
                if (sorted_letter == correct_letter) {
                    matched = true;
                    used_letters.push(i);
                    break;
                }
            }
            if (!matched)
                break;
        }
        if (used_letters.length == sorted_letters.length)
            console.log(correct_word);
    }
});
