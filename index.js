'use strict';

var objectAssign = require('object-assign');
var defaults = {
  sequence: '|/-\\',
  delay: 150,
};

function Idle(options) {
  this.options = objectAssign(defaults, options || {});
}

Idle.prototype.start = function() {
  this.stop();
  this.interval = setInterval(this.render.bind(this), this.options.delay);
};

Idle.prototype.stop = function() {
  this.index = 0;
  clearInterval(this.interval);
};

Idle.prototype.render = function() {
  var sequence = this.options.sequence;

  print(sequence[this.index]);

  if(this.index === sequence.length - 1) {
    this.index = 0;
  } else {
    this.index++;
  }
};



//var interval;
//var delay = 150;
//var steps = '|/-\\';
//var steps = '◢◣◤◥';
//var steps = '◐◓◑◒';
//var steps = ['.', '..', '...'];
// var steps = [
//   '◎ ◎ ◎',
//   '◉ ◎ ◎',
//   '◉ ◉ ◎',
//   '◉ ◉ ◉'
// ];

// var steps = [
//   '▹▹▹▹▹',
//   '▸▹▹▹▹',
//   '▸▸▹▹▹',
//   '▸▸▸▹▹',
//   '▸▸▸▸▹',
//   '▸▸▸▸▸'
// ];

//var iteration = 0;

function print(value) {
  process.stderr.clearLine();
  process.stderr.cursorTo(0);
  process.stderr.write(value.toString());
}


var idle = new Idle();
idle.start();

setTimeout(function() {this.stop()}.bind(idle), 1500)
