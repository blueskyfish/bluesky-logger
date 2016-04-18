/**
 * bluesky-logger - https://github.com/blueskyfish/bluesky-logger.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2016 BlueSkyFish
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


module.exports = {

  adjustLevel: function (level) {
    return adjustLevel_(level);
  },

  toLogLevel: function (s) {
    return toLogLevel_(s);
  },

  /**
   * This level disabled all log message.
   * @constant
   */
  LEVEL_NONE: LEVEL_NONE,

  /**
   * This level shows all log message greater or equal `TRACE`.
   * @constant
   */
  LEVEL_TRACE: LEVEL_TRACE,

  /**
   * This level shows all log message greater or equal `DEBUG`.
   * @constant
   */
  LEVEL_DEBUG: LEVEL_DEBUG,

  /**
   * This level shows all log message greater or equal `CONFIG`.
   * @constant
   */
  LEVEL_CONFIG: LEVEL_CONFIG,

  /**
   * This level shows all log message greater or equal `INFO`.
   * @constant
   */
  LEVEL_INFO: LEVEL_INFO,

  /**
   * This level shows all log message greater or equal `WARN`.
   * @constant
   */
  LEVEL_WARN: LEVEL_WARN,

  /**
   * This level shows all log message.
   * @constant
   */
  LEVEL_ALL: LEVEL_ALL,

  /**
   * The default log level.
   * @constant
   */
  DEFAULT_LEVEL: DEFAULT_LEVEL
};


function adjustLevel_(level) {
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

function toLogLevel_(s) {
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
