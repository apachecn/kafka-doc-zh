'use strict';

var isExtendable = require('is-extendable');

module.exports = Object.assign || function(obj/*, objects*/) {
  if (obj === null || typeof obj === 'undefined') {
    throw new TypeError('expected an object');
  }
  for (var i = 1; i < arguments.length; i++) {
    var val = arguments[i];
    if (isObject(val)) {
      assign(obj, val);
    }
  }
  return obj;
};

function assign(a, b) {
  for (var key in b) {
    if (hasOwn(b, key)) {
      a[key] = b[key];
    }
  }
}

function isObject(val) {
  return (val && typeof val === 'object') || isExtendable(val);
}

/**
 * Returns true if the given `key` is an own property of `obj`.
 */

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
