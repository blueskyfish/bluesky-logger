/**
 * bluesky-logger - https://github.com/blueskyfish/bluesky-logger.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2016 BlueSkyFish
 */

'use strict';

var levels = require('./levels');
var writer = require('./writer');


function _isLevelEnabled(logLevel, askLevel) {
  return logLevel >= askLevel;
}


/**
 * Logger class
 * @constructor
 */
var Logger = function (logName, logLevel) {
  /**
   * The last part of the namespace.
   * e.g. com.example.service.HotService -> HotService
   *
   * @type {string}
   */
  this.logName  = logName;

  /**
   * @type {number}
   * @see levels
   */
  this.logLevel = logLevel;

};

/**
 * Returns true if the log level in "TRACE"
 *
 * @return {boolean}
 */
Logger.prototype.isTraceEnable = function () {
  return _isLevelEnabled(levels.LEVEL_TRACE, this.logLevel);
};

/**
 * Returns true if the log level in "DEBUG"
 *
 * @return {boolean}
 */
Logger.prototype.isDebugEnabled = function () {
  return _isLevelEnabled(levels.LEVEL_DEBUG, this.logLevel);
};

/**
 * Returns true if the log level in "CONFIG"
 *
 * @return {boolean}
 */
Logger.prototype.isConfigEnabled = function () {
  return _isLevelEnabled(levels.LEVEL_CONFIG, this.logLevel);
};

/**
 * Returns true if the log level in "INFO"
 *
 * @return {boolean}
 */
Logger.prototype.isInfoEnabled = function () {
  return _isLevelEnabled(levels.LEVEL_INFO, this.logLevel);
};

/**
 * Returns true if the log level in "WARN"
 *
 * @return {boolean}
 */
Logger.prototype.isWarnEnabled = function () {
  return _isLevelEnabled(levels.LEVEL_WARN, this.logLevel);
};

/**
 * Write the log message in level "TRACE"
 *
 * @params {*} ...
 */
Logger.prototype.trace = function () {
  if (this.isTraceEnable()) {
    writer.write('trace', this.logName, arguments);
  }
};

/**
 * Write the log message in level "DEBUG"
 *
 * @params {*} ...
 */
Logger.prototype.debug = function () {
  if (this.isDebugEnabled()) {
    writer.write('debug', this.logName, arguments);
  }
};

/**
 * Write the log message in level "CONFIG"
 *
 * @params {*} ...
 */
Logger.prototype.config = function () {
  if (this.isConfigEnabled()) {
    writer.write('config', this.logName, arguments);
  }
};

/**
 * Write the log message in level "INFO"
 *
 * @params {*} ...
 */
Logger.prototype.info = function () {
  if (this.isInfoEnabled()) {
    writer.write('info', this.logName, arguments);
  }
};

/**
 * Write the log message in level "WARN"
 *
 * @params {*} ...
 */
Logger.prototype.warn = function () {
  if (this.isWarnEnabled()) {
    writer.write('warn', this.logName, arguments);
  }
};

/**
 * Returns the log level (as number)
 *
 * @return {number}
 */
Logger.prototype.getLevel = function () {
  return this.logLevel;
};

/**
 * Returns the name of the logger.
 *
 * @return {string}
 */
Logger.prototype.getName = function () {
  return this.logName;
};


/**
 * Set a new log level
 *
 * @param {number} logLevel
 */
Logger.prototype.setLevel = function (logLevel) {
  this.logLevel = logLevel;
};


//
// Export the class "Logger"
//
module.exports = Logger;
