/**
 * bluesky-logger - https://github.com/blueskyfish/bluesky-logger.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2016 BlueSkyFish
 */

'use strict';

var assert = require('assert');

var cache = require('../lib/cache');
var loggerFactory = require('../factory');
var levels = require('../lib/levels');

describe('Logger: get a logger from namespace', function () {

  before(function () {
    loggerFactory
      .config({
        'root': 'config',
        'example-service': 'debug',
        'example-service-util': 'info'
      })
      .setSeparator('-');
  });

  it('Should the logger has functions', function () {
    var logger = loggerFactory.getLogger('example-service-httpService');
    assert.equal('function', typeof logger.getLevel);
    assert.equal('function', typeof logger.getName);
    assert.equal('number', typeof logger.getLevel());
    assert.equal(levels.LEVEL_DEBUG, logger.getLevel());
  });

  it('Should the same logger instance, when access the same namespace', function () {
    var logger1 = loggerFactory.getLogger('example-service-httpService');
    var logger2 = loggerFactory.getLogger('example-service-httpService');
    assert.equal(logger1, logger2);
  });

  it('Should the same log level and a differen name', function () {
    var logger1 = loggerFactory.getLogger('example-service-httpService');
    var logger2 = loggerFactory.getLogger('example-service-databaseService');
    assert.equal(levels.LEVEL_DEBUG, logger1.getLevel(), 'should log level LEVEL_DEBUG');
    assert.equal(levels.LEVEL_DEBUG, logger2.getLevel(), 'should log level LEVEL_DEBUG');
    assert.notEqual(logger1, logger2, 'should not the same instance');
    assert.equal(logger1.getLevel(), logger2.getLevel(), 'should the same log level');
    assert.notEqual(logger1.getName(), logger2.getName(), 'should not the same log name');
    assert.equal('httpService', logger1.getName(), 'should the log name "httpService"');
    assert.equal('databaseService', logger2.getName(), 'should the log name "databaseService"');
  });

  it('Should have the root log level for unknown namespace', function () {
    var logger = loggerFactory.getLogger('example-view-homePage');
    assert.equal(levels.LEVEL_CONFIG, logger.getLevel());
    assert.equal('homePage', logger.getName());
    assert.equal(true, logger.isConfigEnabled());
    assert.equal(false, logger.isDebugEnabled());
    assert.equal(true, logger.isInfoEnabled());
  });

  it('Should different log level from namespace "example-service-XX"', function () {
    var logger1 = loggerFactory.getLogger('example-service-httpService');
    var logger2 = loggerFactory.getLogger('example-service-util-utilHttp');
    assert.notEqual(logger1, logger2);
    assert.notEqual(logger1.getLevel(), logger2.getLevel());
    assert.equal(levels.LEVEL_DEBUG, logger1.getLevel());
    assert.equal(levels.LEVEL_INFO, logger2.getLevel());
  });

  after(function () {
    cache.reset();
  });

});
