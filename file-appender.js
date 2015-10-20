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
var strftime = require('strftime');

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

    buildFilename: function (date) {
      return buildFilename_(date);
    }
  };
};

function _init(options) {
  mOptions = options;
}

function appendMessage_(logName, message) {
  var filename = buildFilename_(new Date());
  var time = strftime('%H:%M:%S');
  var content = [
    time,
    ' ', _.padLeft(logName, 10, ' '), ' ',
    message
  ].join('');

  fs.appendFile(filename, content, 'utf8', function (err) {
    if (err) {
      throw err;
    }
  });
}

function buildFilename_(date) {
  return mOptions.template.replace(/\{date\}/g, strftime('%Y-%m-%d', date));
}
