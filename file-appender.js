/**
 * bluesky-logger - https://github.com/blueskyfish/bluesky-logger.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var fs = require('fs');
var path = require('path');

var _ = require('lodash');
var moment = require('moment');

var mOptions = {};

/**
 *
 * @param options
 * @returns {object#appendMessage(logName, message)}
 */
module.exports = function (options) {

  mOptions.path = options.path || __dirname;
  mOptions.name = options.name || path.basename(__filename, '.js');
  mOptions.template = path.join(mOptions.path, '{date}-' + mOptions.name + '.log');

  return {

    appendMessage: function (logName, message) {
      appendMessage_(logName, message);
    },

    /**
     * Create the filename
     * @param {moment} date the moment
     * @return {string} the filename
     */
    buildFilename: function (date) {
      return buildFilename_(date);
    }
  };
};

function appendMessage_(logName, message) {
  var date = moment();
  var filename = buildFilename_(date);
  var time = date.format('hh:mm:ss');
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

function buildFilename_(date) {
  return mOptions.template.replace(/\{date\}/g, date.format('YYYY-MM-DD'));
}
