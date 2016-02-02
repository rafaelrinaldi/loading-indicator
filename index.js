'use strict';

var logUpdate = require('log-update');
var presets = require('./presets');

function stop(timer, shouldKeepOutput) {
  if (!shouldKeepOutput) {
    logUpdate.clear();
  }

  clearInterval(timer);
}

function start(text, options) {
  var delay = options && options.delay ? options.delay : 100;
  var frames = options && options.frames ? options.frames : presets.spinner;
  var render = options && options.render ? options.render : logUpdate;
  var frame = 0;

  return setInterval(function () {
    render(frames[frame = ++frame % frames.length] + (text ? (' ' + text) : ''));
  }, delay || 100);
}

module.exports = {
  start: start,
  stop: stop
};
