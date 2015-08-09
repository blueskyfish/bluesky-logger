/**
 * Project: bluesky-logger
 */

'use strict';

var
  _ = require('lodash'),
  strftime = require('strftime');

var
  LEVEL_NONE = 1000,
  LEVEL_TRACE = 5,
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
    case LEVEL_TRACE:
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

    mWriteFunc(list.join(''));
}

/**
 * Instance `logger`
 */
module.exports = {

  /**
   * @name setLevel
   * @description
   * Set the log level.
   *
   * @param {number} level
   */
  setLevel: function (level) {
    mLogLevel = _adjustLevel(level);
  },

  /**
   * @name setWriter
   * @description
   * Set the output writer. The callback function is calling for every log message.
   *
   * @param {function|null} writeFunc
   */
  setWriter: function (writeFunc) {
    if (writeFunc === null) {
      mWriteFunc = _defaultWriterToConsole;
      return;
    }
    if (typeof writeFunc === 'function') {
      mWriteFunc = writeFunc;
    }
  },

  /**
   * @name trace
   * @description
   * Writes log message with the level `TRACE`
   *
   * All parameters will join together and write into the writer function
   */
  trace: function () {
    if (_isLevel(LEVEL_TRACE)) {
      _write('trace', arguments);
    }
  },

  /**
   * @name debug
   * @description
   * Writes log message with the level `DEBUG`
   *
   * All parameters will join together and write into the writer function
   */
  debug: function () {
    if (_isLevel(LEVEL_DEBUG)) {
      _write('debug', arguments);
    }
  },

  /**
   * @name config
   * @description
   * Writes log message with the level `CONFIG`
   *
   * All parameters will join together and write into the writer function
   */
  config: function () {
    if (_isLevel(LEVEL_CONFIG)) {
      _write('config', arguments);
    }
  },

  /**
   * @name info
   * @description
   * Writes log message with the level `INFO`
   *
   * All parameters will join together and write into the writer function
   */
  info: function () {
    if (_isLevel(LEVEL_INFO)) {
      _write('info', arguments);
    }
  },

  /**
   * @name warn
   * @description
   * Writes log message with the level `WARN`
   *
   * All parameters will join together and write into the writer function
   */
  warn: function () {
    if (_isLevel(LEVEL_DEBUG)) {
      _write('warn', arguments);
    }
  },

  /**
   * @name LEVEL_NONE
   * @description
   * This level disabled all log message.
   */
  LEVEL_NONE: LEVEL_NONE,

  /**
   * @name LEVEL_TRACE
   * @description
   * This level shows all log message greater or equal `TRACE`.
   */
  LEVEL_TRACE: LEVEL_TRACE,

  /**
   * @name LEVEL_DEBUG
   * @description
   * This level shows all log message greater or equal `DEBUG`.
   */
  LEVEL_DEBUG: LEVEL_DEBUG,

  /**
   * @name LEVEL_CONFIG
   * @description
   * This level shows all log message greater or equal `CONFIG`.
   */
  LEVEL_CONFIG: LEVEL_CONFIG,

  /**
   * @name LEVEL_INFO
   * @description
   * This level shows all log message greater or equal `INFO`.
   */
  LEVEL_INFO: LEVEL_INFO,

  /**
   * @name LEVEL_WARN
   * @description
   * This level shows all log message greater or equal `WARN`.
   */
  LEVEL_WARN: LEVEL_WARN,

  /**
   * @name LEVEL_ALL
   * @description
   * This level shows all log message.
   */
  LEVEL_ALL: LEVEL_ALL

};
