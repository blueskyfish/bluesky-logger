/**
 * bluesky-logger - https://github.com/blueskyfish/bluesky-logger.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2016 BlueSkyFish
 */

'use strict';

var _ = require('lodash');
var moment = require('moment');

// ----------------------------------------------------------------------------
// Internal variables
//

var mWriteFunc = _defaultWriterToConsole;

// ----------------------------------------------------------------------------



// The default writer: all output prints to the console.
function _defaultWriterToConsole(name, message) {
  var time = moment().format('hh:mm:ss');
  var list = [
    time,
    ' ', _.padStart(name, 10, ' '), ' ',
    message
  ];
  console.log(list.join(''));
}

// ----------------------------------------------------------------------------

module.exports = {
  /**
   * Set the output writer. The callback function is calling for every log message.
   *
   * Signature of the writeFunc
   * function (logName, message) { }
   *
   * @param {function|null} writeFunc
   */
  setWriter: function (writeFunc) {
    setWriter_(writeFunc);
  },

  /**
   * Writes the log message
   */
  write: function (level, logName, args) {
    write_(level, logName, args);
  }
};

function setWriter_(writeFunc) {
  if (writeFunc === null) {
    mWriteFunc = _defaultWriterToConsole;
    return;
  }
  if (typeof writeFunc === 'function') {
    mWriteFunc = writeFunc;
  }
}

function write_(level, logName, args) {
  var list = [
    '[ ', _.padStart(level, 6, ' '), ' ] '
  ];

  for (var index in args) {
    if (args.hasOwnProperty(index)) {
      list.push(args[ index ]);
    }
  }

  mWriteFunc(logName, list.join(''));
}
