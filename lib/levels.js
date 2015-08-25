/**
 * bluesky-logger - https://github.com/blueskyfish/bluesky-logger.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var
  LEVEL_NONE = 1000,
  LEVEL_TRACE = 5,
  LEVEL_DEBUG = 10,
  LEVEL_CONFIG = 20,
  LEVEL_INFO = 50,
  LEVEL_WARN = 99,
  LEVEL_ALL = 0,

  DEFAULT_LEVEL = LEVEL_DEBUG;

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

function _toLogLevel(s) {
  switch (s) {
    case 'warn':
      return LEVEL_WARN;
    case 'info':
      return LEVEL_INFO;
    case 'config':
      return LEVEL_CONFIG;
    case 'debug':
      return LEVEL_DEBUG;
    case 'trace':
      return LEVEL_TRACE;
    case 'all':
      return LEVEL_ALL;
    case 'none':
      return LEVEL_NONE;
    default:
      return DEFAULT_LEVEL;
  }
}


module.exports = {

  adjustLevel: function (level) {
    return _adjustLevel(level);
  },

  toLogLevel: function (s) {
    return _toLogLevel(s);
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
  LEVEL_ALL: LEVEL_ALL,

  DEFAULT_LEVEL: DEFAULT_LEVEL
};
