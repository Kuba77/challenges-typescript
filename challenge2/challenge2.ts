/// <reference path="../typings/main.d.ts" />
var keypress = require('keypress');
var fs = require('fs');

class Stopwatch {
    running: boolean;
    time: number = 0.0;
    laps: number[] = [];

    start = () => {
        this.time = 0.0;
        this.laps = []
        this.running = true;
        setTimeout((this.addTime), 100);
    }

    addTime = () => {
        this.time += 0.1;
        this.draw();
        if (this.running)
            setTimeout(this.addTime, 100);
    }

    split = () => {
        this.laps.push(this.time);
    }

    stop = () => {
        this.running = false;
        this.laps.push(this.time);
        this.draw();
        this.saveFile();
    }

    saveFile = () => {
        var now: Date = new Date();
        var filename: string = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}.json`
        fs.writeFile(filename, JSON.stringify({ laps: this.laps }));
    }

    draw = () => {
        process.stdout.write('\033c');
        if (this.running) {
            console.log('Arrow up to split, Arrow down to stop');
            console.log('Status: Running');
        }
        else {
            console.log('Arrow up to start, Arrow down to quit');
            console.log('Status: Stopped');
        }
        console.log(`Current time: ${this.time.toFixed(1)}`);
        for (var index in this.laps) {
            console.log(`Lap ${~~index + 1}: ${this.laps[index].toFixed(1)}`);
        }
    }
}

var stopwatch = new Stopwatch();
stopwatch.draw();

keypress(process.stdin);

process.stdin.on('keypress', function(ch, key) {
    if (key.name == 'up') {
        if (!stopwatch.running)
            stopwatch.start();
        else
            stopwatch.split();
    }
    else if (key.name == 'down') {
        if (!stopwatch.running)
            process.exit(1);
        else
            stopwatch.stop();
    }
});

process.stdin.setEncoding('utf8');
process.stdin.setRawMode(true);
process.stdin.resume();