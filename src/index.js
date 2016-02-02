'use strict';

var logUpdate = require('log-update');
var presets = require('./presets');

var frames = presets.spinner;
var frame = 0;
var interval;

function stop(shouldKeepOutput) {
  if (!shouldKeepOutput) {
    logUpdate.clear();
  }

  clearInterval(interval);
}

function start(text, options) {
  stop();

  return setInterval(function() {
    logUpdate(frames[frame = ++frame % frames.length] + (text || ''));
  }, options.delay || 100);
}

function use(preset) {
  frames = typeof preset === 'string' ? presets[preset] : preset;
}

module.exports = {
  start: start,
  stop: stop,
  use: use
};
