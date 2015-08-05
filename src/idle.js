'use strict';
var objectAssign = require('object-assign');
var write = require('write.js');
var presets = require('./presets');
var defaults = require('./defaults');
var compose = require('./compose');

// Idle

function Idle(options) {
  var options = objectAssign(defaults, options || {});
  var sequence = options.sequence || presets[options.preset];

  this.options = options;
  this.sequence = sequence;

  this.interval = undefined;

  this._index = 0;
  this._isMoonwalking = false;

  return this;
}

// Prototype methods simply run helpers and save their returned "Idle" at
// the instance. So we can write just a couple stateful functions

Idle.prototype.start = function() {
  var step = this;
  this.stop();

  this._interval = setInterval(function() {
    step = render(step);
  }.bind(this), this.options.delay);
};

Idle.prototype.stop = function() {
  clearInterval(this._interval);

  return objectAssign(this, {
    _interval: undefined,
    _index: 0,
    _isMoonwalking: false,
  });
};

// Helper functions

function render(idle) {
  var output = generateOutput(idle);
  var next = nextStep(idle);

  compose(
    write,
    generateOutput
  )(next);

  return next;
}

function generateOutput(idle) {
  var index = idle._isMoonwalking ?
      // invert index when moonwalking
      (idle.sequence.length - 1) - idle._index

      // normally walk
    : idle._index

  return idle.options.prefix + idle.sequence[index] + idle.options.suffix;
}

function nextStep(idle) {
  var sequenceMax = idle.sequence.length - 1;
  var atEnd = idle._index === sequenceMax;
  var atStart = idle._index === 0;
  var next;

  if (atEnd) {
    next = objectAssign({}, idle, {
      _index: 0,
      _isMoonwalking: idle.options.moonwalk && !idle._isMoonwalking
    });
  } else {
    next = objectAssign({}, idle, {
      _index: idle._index + 1
    });
  }

  return next;
}

module.exports = Idle;
