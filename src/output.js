'use strict';

var logOutput = require('log-output');
var isPhantom = require('is-phantom');
var phantomAdapter = require('log-output-phantom');

module.exports = function() {
  var args = Array.prototype.slice.call(arguments);

  if(isPhantom()) {
    logOutput.adapter(phantomAdapter());
  }

  return logOutput.apply(this, args);
};
