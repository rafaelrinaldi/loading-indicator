'use strict';

var objectAssign = require('object-assign');
var output = require('./output');
var presets = require('./presets');
var defaults = require('./defaults');

function LoadingIndicator(options) {
  this.options = objectAssign(defaults, options || {});
  this.sequence = this.options.sequence || presets[this.options.preset];
}

LoadingIndicator.prototype.start = function() {
  this.stop();
  this.interval = setInterval(this.render.bind(this), this.options.delay);
};

LoadingIndicator.prototype.stop = function() {
  this.index = 0;
  this.isMoonwalking = false;

  clearInterval(this.interval);
};

LoadingIndicator.prototype.render = function() {
  var message = this.options.prefix + this.sequence[this.index] + this.options.suffix;

  output(message);

  this._updateIndex();
};

LoadingIndicator.prototype._updateIndex = function() {
  var hasFinishedSequence = this.index === this.sequence.length - 1;
  var hasStartedSequence = this.index === 0;
  var shouldMoonwalk = this.options.moonwalk;

  if(shouldMoonwalk) {
    if(hasFinishedSequence) {
      this.isMoonwalking = true;
    } else if(hasStartedSequence) {
      this.isMoonwalking = false;
    }

    if(this.isMoonwalking) {
      this._previous();
    } else {
      this._next();
    }
  } else {
    this._next();
  }
};

LoadingIndicator.prototype._previous = function() {
  if(this.index > 0) {
    this.index--;
  }
};

LoadingIndicator.prototype._next = function() {
  if(this.index < this.sequence.length - 1) {
    this.index++;
  } else {
    this.index = 0;
  }
};

module.exports = LoadingIndicator;
