/// <reference path="../typings/main.d.ts" />
var keypress = require('keypress');
var fs = require('fs');
var Stopwatch = (function () {
    function Stopwatch() {
        var _this = this;
        this.time = 0.0;
        this.laps = [];
        this.start = function () {
            _this.time = 0.0;
            _this.laps = [];
            _this.running = true;
            setTimeout((_this.addTime), 100);
        };
        this.addTime = function () {
            _this.time += 0.1;
            _this.draw();
            if (_this.running)
                setTimeout(_this.addTime, 100);
        };
        this.split = function () {
            _this.laps.push(_this.time);
        };
        this.stop = function () {
            _this.running = false;
            _this.laps.push(_this.time);
            _this.draw();
            _this.saveFile();
        };
        this.saveFile = function () {
            var now = new Date();
            var filename = now.toLocaleDateString() + " " + now.toLocaleTimeString() + ".json";
            fs.writeFile(filename, JSON.stringify({ laps: _this.laps }));
        };
        this.draw = function () {
            process.stdout.write('\033c');
            if (_this.running) {
                console.log('Arrow up to split, Arrow down to stop');
                console.log('Status: Running');
            }
            else {
                console.log('Arrow up to start, Arrow down to quit');
                console.log('Status: Stopped');
            }
            console.log("Current time: " + _this.time.toFixed(1));
            for (var index in _this.laps) {
                console.log("Lap " + (~~index + 1) + ": " + _this.laps[index].toFixed(1));
            }
        };
    }
    return Stopwatch;
}());
var stopwatch = new Stopwatch();
stopwatch.draw();
keypress(process.stdin);
process.stdin.on('keypress', function (ch, key) {
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
