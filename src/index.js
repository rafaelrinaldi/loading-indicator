'use strict';

var objectAssign = require('object-assign');
var output = require('log-output');
var presets = require('./presets');
var defaults = require('./defaults');

function LoadingIndicator(options) {
  this.options = objectAssign(defaults, options || {});
  this.sequence = this.options.sequence || presets[this.options.preset];
  this.index = 0;
}

LoadingIndicator.prototype.start = function() {
  this.interval = setInterval(this.render.bind(this), this.options.delay);
};

LoadingIndicator.prototype.stop = function() {
  this.index = 0;

  output.done();

  clearInterval(this.interval);
};

LoadingIndicator.prototype.render = function() {
  var frame = this.sequence[this.index++ % this.sequence.length];
  var message = this.options.prefix + frame + this.options.suffix;

  output(message);
};

module.exports = LoadingIndicator;
