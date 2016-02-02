'use strict';

const spinner = require('./src');
const timer = spinner.start();

setTimeout(() => {
  console.log('should stop');
  spinner.stop(timer);
}, 3500);
