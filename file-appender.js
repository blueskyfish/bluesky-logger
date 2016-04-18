/**
 * bluesky-logger - https://github.com/blueskyfish/bluesky-logger.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2016 BlueSkyFish
 */

'use strict';

var fs = require('fs');
var path = require('path');

var _ = require('lodash');
var moment = require('moment');

/**
 * @name FileAppenderOptions
 * @property {string} path the path to save the log file.
 * @property {string} name the filename without the "date" pattern.
 * @property {string} [timePattern] the time pattern for the log message.
 * @property {string} [datePattern] the date pattern for the filename.
 */

/**
 * Returns a instance the the appendMessage and buildFilename method.

 * @param {FileAppenderOptions} options
 * @returns {object#appendMessage(logName, message)}
 */
module.exports = function (options) {

  options.path = options.path || process.cwd();
  options.name = options.name || path.basename(process.cwd());
  options.timePattern = options.timePattern || 'hh:mm:ss';
  options.datePattern = options.datePattern || 'YYYY-MM-DD';
  options.template = '' + path.join(options.path, '{date}-' + options.name + '.log');

  return {

    appendMessage: function (logName, message) {
      appendMessage_(options, logName, message);
    },

    /**
     * Create the filename (only for test cases)
     * @param {moment} date the moment
     * @return {string} the filename
     */
    buildFilename: function (date) {
      return buildFilename_(options, date);
    }
  };
};

function appendMessage_(options, logName, message) {
  var date = moment();
  var filename = buildFilename_(options, date);
  var time = date.format(options.timePattern);
  var content = [
    time,
    ' ', _.padStart(logName, 10, ' '), ' ',
    message,
    '\n'
  ].join('');

  fs.appendFile(filename, content, 'utf8', function (err) {
    if (err) {
      throw err;
    }
  });
}

function buildFilename_(options, date) {
  return options.template.replace(/\{date\}/g, date.format(options.datePattern));
}
