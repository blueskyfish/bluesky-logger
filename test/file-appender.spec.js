/**
 * bluesky-logger - https://github.com/blueskyfish/bluesky-logger.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2016 BlueSkyFish
 */

'use strict';

var assert = require('assert');
var fs = require('fs');

var moment = require('moment');

var fileAppender = require('../file-appender');

describe('File Appender Unit Test', function () {

  var filer = fileAppender({
    path: 'test/',
    name: 'abc-test'
  });

  it('Should build a filename', function () {
    var date = moment('2015-10-20');
    var filename = filer.buildFilename(date);
    assert.equal(filename, 'test/2015-10-20-abc-test.log');
  });

  it('Should write a message', function (done) {
    filer.appendMessage('test', 'This is a message');

    setTimeout(function () {
      var filename = 'test/' + moment().format('YYYY-MM-DD') + '-abc-test.log';
      assert.equal(true, fs.existsSync(filename), 'File "' + filename + '" should exist');
      //fs.unlinkSync(filename);
      done();
    }, 1000);
  });

});
