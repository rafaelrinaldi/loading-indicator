'use strict';

var logUpdate = require('log-update');

// FIXME: Should be a separate module
var presets = require('./presets');

function stop(timer, shouldKeepOutput) {
  if (!shouldKeepOutput) {
    logUpdate.clear();
  }

  clearInterval(timer);
}

function start(text, options) {
  var delay = options && options.delay ? options.delay : 100;
  var frames = options && options.frames ? options.frames : presets.sticks;
  var frame = 0;

  return setInterval(function () {
    logUpdate(frames[frame = ++frame % frames.length] + (text || ''));
  }, delay || 100);
}

module.exports = {
  start: start,
  stop: stop
};
