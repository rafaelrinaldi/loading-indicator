'use strict';

function compose(/* fns */) {
  var fns = Array.prototype.slice.call(arguments);

  return function(input) {
    return fns.reduceRight(function __reducer__ (acc, fn) {
      return fn(acc);
    }, input);
  }
};

module.exports = compose;
