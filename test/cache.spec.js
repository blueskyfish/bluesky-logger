/**
 * bluesky-logger - https://github.com/blueskyfish/bluesky-logger.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2016 BlueSkyFish
 */

'use strict';

var assert = require('assert');

var cache = require('../lib/cache');
var levels = require('../lib/levels');

describe('Cache Logger Unit Tests', function () {

  beforeEach(function () {
    cache
      .add('root', 'info')
      .add('test-service', 'debug')
      .add('test-service-loader', 'trace')
      .add('test-lock', 'none')
      .add('server', 'warn')
      .setSeparator('-');
  });

  it('Should have "info" when get "root" namespace', function () {
    var logger = cache.getLogger('root');
    assert(logger.getLevel() === levels.LEVEL_INFO, '"root" should have "info" log level');
    assert(logger.getName() === 'root', 'logger should have the name "root"');
  });

  it('Should have "info" when get unknown "database" namespace', function () {
    var logger = cache.getLogger('database');
    assert(logger.getLevel() === levels.LEVEL_INFO, '"database" should have "info" log level');
    assert(logger.getName() === 'database', 'logger should have the name "database"');
  });

  it('Should have "info" when get "test" namespace', function () {
    var logger = cache.getLogger('test');
    assert(logger.getLevel() === levels.LEVEL_INFO, '"test" should have "info" log level');
    assert(logger.getName() === 'test', 'logger should have the name "test"');
  });

  it('Should have "none" when get "test-lock" namespace', function () {
    var logger = cache.getLogger('test-lock');
    assert(logger.getLevel() === levels.LEVEL_NONE, '"test-lock" should have "none" log level');
    assert(logger.getName() === 'lock', 'logger should have the name "lock"');
  });

  it('Should have "debug" when get "test-service" namespace', function () {
    var logger = cache.getLogger('test-service');
    assert(logger.getLevel() === levels.LEVEL_DEBUG, '"test-service" should have "debug" log level');
    assert(logger.getName() === 'service', 'logger should have the name "service"');
  });

  it('Should have "trace" when get "test-service-loader" namespace', function () {
    var logger = cache.getLogger('test-service-loader');
    assert(logger.getLevel() === levels.LEVEL_TRACE, '"test-service-loader" should have "trace" log level');
    assert(logger.getName() === 'loader', 'logger should have the name "loader"');
  });
  
  it('Should have "debug" when get "test-service-mixin" namespace', function () {
    var logger = cache.getLogger('test-service-mixin');
    assert(logger.getLevel() === levels.LEVEL_DEBUG, '"test-service-mixin" should have "debug" log level');
    assert(logger.getName() === 'mixin', 'logger should have the name "mixin"');
  });

  it('Should set the log level, when modified the namespace', function () {
    var logger = cache.getLogger('server');
    assert(logger.getLevel() === levels.LEVEL_WARN, '"server" should have "warn" log level');

    cache.add('server', 'debug');
    assert(logger.getLevel() === levels.LEVEL_DEBUG, '"server should have new log level "debug"');
  });

  afterEach(function () {
    cache.reset();
  });
});