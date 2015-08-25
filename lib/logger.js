/**
 * bluesky-logger - https://github.com/blueskyfish/bluesky-logger.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var levels = require('./levels');
var writer = require('./writer');


function _isLevelEnabled(logLevel, askLevel) {
  return logLevel >= askLevel;
}


/**
 * @constructor
 * @name Logger
 * @description
 * Logger class
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

Logger.prototype.isTraceEnable = function () {
  return _isLevelEnabled(levels.LEVEL_TRACE, this.logLevel);
};

Logger.prototype.isDebugEnabled = function () {
  return _isLevelEnabled(levels.LEVEL_DEBUG, this.logLevel);
};

Logger.prototype.isConfigEnabled = function () {
  return _isLevelEnabled(levels.LEVEL_CONFIG, this.logLevel);
};

Logger.prototype.isInfoEnabled = function () {
  return _isLevelEnabled(levels.LEVEL_INFO, this.logLevel);
};

Logger.prototype.isWarnEnabled = function () {
  return _isLevelEnabled(levels.LEVEL_WARN, this.logLevel);
};

Logger.prototype.trace = function () {
  if (this.isTraceEnable()) {
    writer.write('trace', this.logName, arguments);
  }
};

Logger.prototype.debug = function () {
  if (this.isDebugEnabled()) {
    writer.write('debug', this.logName, arguments);
  }
};

Logger.prototype.config = function () {
  if (this.isConfigEnabled()) {
    writer.write('config', this.logName, arguments);
  }
};

Logger.prototype.info = function () {
  if (this.isInfoEnabled()) {
    writer.write('info', this.logName, arguments);
  }
};

Logger.prototype.warn = function () {
  if (this.isWarnEnabled()) {
    writer.write('warn', this.logName, arguments);
  }
};

Logger.prototype.getLevel = function () {
  return this.logLevel;
};

Logger.prototype.getName = function () {
  return this.logName;
};

//
// Export the class "Logger"
//
module.exports = Logger;
