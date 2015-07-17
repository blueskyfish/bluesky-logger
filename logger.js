/**
 * Project: bluesky-logger
 */

'use strict';

var
  _ = require('lodash'),
  strftime = require('strftime');

var
  LEVEL_NONE = 1000,
  LEVEL_DEBUG = 10,
  LEVEL_CONFIG = 20,
  LEVEL_INFO = 50,
  LEVEL_WARN = 99,
  LEVEL_ALL = 0,

  DEFAULT_LEVEL = LEVEL_DEBUG;

var
  mLogLevel = DEFAULT_LEVEL,

  mWriteFunc = _defaultWriterToConsole;

function _defaultWriterToConsole(out) {
  console.log(out);
}

function _adjustLevel(level) {
  switch (level) {
    case LEVEL_NONE:
    case LEVEL_DEBUG:
    case LEVEL_CONFIG:
    case LEVEL_INFO:
    case LEVEL_WARN:
    case LEVEL_ALL:
      return level;
    default:
      return DEFAULT_LEVEL;
  }
}

function _isLevel(level) {
  return level >= mLogLevel;
}

function _write(level, args) {
  var
    time = strftime('%H:%M:%S'),
    list = [
      time,
      '[', _.padLeft(level, ' '), ']'
    ];

    for (var index in args) {
      if (args.hasOwnProperty(index)) {
        list.push(args[ index ]);
      }
    }

    mWriteFunc(list.join(' '));
}

/**
 * Instance `logger`
 */
module.exports = {

  setLevel: function (level) {
    mLogLevel = _adjustLevel(level);
  },

  setWriter: function (writeFunc) {
    if (writeFunc === null) {
      mWriteFunc = _defaultWriterToConsole;
      return;
    }
    if (typeof writeFunc === 'function') {
      mWriteFunc = writeFunc;
    }
  },

  debug: function () {
    if (_isLevel(LEVEL_DEBUG)) {
      _write('debug', arguments);
    }
  },

  info: function () {
    if (_isLevel(LEVEL_INFO)) {
      _write('info', arguments);
    }
  },

  config: function () {
    if (_isLevel(LEVEL_CONFIG)) {
      _write('config', arguments);
    }
  },

  warn: function () {
    if (_isLevel(LEVEL_DEBUG)) {
      _write('warn', arguments);
    }
  },

  LEVEL_NONE: LEVEL_NONE,
  LEVEL_DEBUG: LEVEL_DEBUG,
  LEVEL_CONFIG: LEVEL_CONFIG,
  LEVEL_INFO: LEVEL_INFO,
  LEVEL_WARN: LEVEL_WARN,
  LEVEL_ALL: LEVEL_ALL,

}
