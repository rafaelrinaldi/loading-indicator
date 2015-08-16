'use strict';

var LoadingIndicator = require('./');
var spin = new LoadingIndicator();

spin.start();

setTimeout(function() {
  spin.stop();
  process.exit();
}, 3500);
