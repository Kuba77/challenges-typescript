/// <reference path="../typings/main.d.ts" />
var os = require('os');
var fs = require('fs');
var readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('wordslist.txt'),
  output: process.stdout,
  terminal: false
});

var scrambled_words: string[] = ['mkeart','sleewa','edcudls','iragoge','usrlsle','nalraoci','nsdeuto','amrhat','inknsy','iferkna'];
var letters_lists: string[][] = [];
for (var word of scrambled_words)
  letters_lists.push(word.split(''));

var correct_words: string[] = [];

rd.on('line', (correct_word: string) => {
  var correct_letters: string[] = correct_word.split('');
  for (var sorted_letters of letters_lists) {
    var used_letters: string[] = [];

    for (var correct_letter of correct_letters) {
      var matched: boolean = false;

      for (var i in sorted_letters) {
        if (used_letters.indexOf(i) !== -1)
          continue;

        var sorted_letter: string = sorted_letters[~~i];
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
