/**
 * bluesky-logger - https://github.com/blueskyfish/bluesky-logger.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var _ = require('lodash');
var strftime = require('strftime');

var levels = require('./levels');
var Logger = require('./logger');

// ----------------------------------------------------------------------------
// Internal variables
//

var mWriteFunc = _defaultWriterToConsole;

// ----------------------------------------------------------------------------



// The default writer: all output prints to the console.
function _defaultWriterToConsole(name, message) {
  var time = strftime('%H:%M:%S');
  var list = [
    time,
    ' ', _.padLeft(name, 10, ' '), ' ',
    message
  ];
  console.log(list.join(''));
}

// ----------------------------------------------------------------------------

var writer = module.exports = {};

/**
 * @name setWriter
 * @description
 * Set the output writer. The callback function is calling for every log message.
 *
 * Signature of the writeFunc
 * function (logName, message) { }
 *
 * @param {function|null} writeFunc
 */
writer.setWriter = function (writeFunc) {
  if (writeFunc === null) {
    mWriteFunc = _defaultWriterToConsole;
    return;
  }
  if (typeof writeFunc === 'function') {
    mWriteFunc = writeFunc;
  }
};

/**
 * Writes the log message
 *
 * @see Logger#debug()
 */
writer.write = function (level, logName, args) {
  var list = [
    '[ ', _.padLeft(level, 6, ' '), ' ] '
  ];

  for (var index in args) {
    if (args.hasOwnProperty(index)) {
      list.push(args[ index ]);
    }
  }

  mWriteFunc(logName, list.join(''));
};

writer.isLevelEnabled = function (logLevel, askLevel) {
  return askLevel >= logLevel;
};
