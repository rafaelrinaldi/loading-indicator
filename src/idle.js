'use strict';

var objectAssign = require('object-assign');
var write = require('write.js');
var presets = require('./presets');
var defaults = require('./defaults');

function Idle(options) {
  this.options = objectAssign(defaults, options || {});
  this.sequence = this.options.sequence || presets[this.options.preset];
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
  var output = this.options.prefix + this.sequence[this.index] + this.options.suffix;

  write(output);

  if(this.index === this.sequence.length - 1) {
    this.index = 0;
  } else {
    this.index++;
  }
};

module.exports = Idle;
