'use strict';
var objectAssign = require('object-assign');
var write = require('write.js');
var presets = require('./presets');
var defaults = require('./defaults');

function Idle(options) {
  var options = objectAssign(defaults, options || {});
  var sequence = options.sequence || presets[options.preset];

  this.options = options;
  this.sequence = sequence;
  this._interval = undefined;
  this._index = 0;
  this._isMoonwalking = false;
}

// Prototype methods simply manage our pure and stateless helpers

Idle.prototype.start = function() {
  this.stop();
  this._interval = setInterval(function() {
    // render state and update "this" to the next state
    objectAssign(this, render(this));
  }.bind(this), this.options.delay);
};

Idle.prototype.stop = function() {
  clearInterval(this._interval);
  objectAssign(this, {
    _interval: undefined,
    _index: 0,
    _isMoonwalking: false,
  });
};

// Helper functions

// render current idle and return the next idle
function render(idle) {
  var next = nextStep(idle);
  write(generateOutput(next));
  return next;
}

// generate string output based on the current idle
function generateOutput(idle) {
  var index = idle._isMoonwalking ?
      // invert index when moonwalking
      (idle.sequence.length - 1) - idle._index

      // normally walk
    : idle._index;

  return idle.options.prefix + idle.sequence[index] + idle.options.suffix;
}

// returns the next step
function nextStep(idle) {
  var max = idle.sequence.length - 1;
  var atEnd = idle._index === max;
  var atStart = idle._index === 0;
  var next = {};

  if (atEnd) {
    // when at and we need to restart the animation
    next._index = 0;
    next._isMoonwalking = idle.options.moonwalk && !idle._isMoonwalking;
  } else {
    next._index = idle._index + 1;
  }

  return objectAssign({}, idle, next);
}

module.exports = Idle;
