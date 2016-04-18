/**
 * bluesky-logger - https://github.com/blueskyfish/bluesky-logger.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2016 BlueSkyFish
 */

'use strict';

var assert = require('assert');

var levels = require('../lib/levels');

describe('Log Level: Test', function () {

  it('Should convert from a string into a valid log level', function () {
    assert.equal(levels.LEVEL_NONE,   levels.toLogLevel('none'));
    assert.equal(levels.LEVEL_TRACE,  levels.toLogLevel('trace'));
    assert.equal(levels.LEVEL_DEBUG,  levels.toLogLevel('debug'));
    assert.equal(levels.LEVEL_CONFIG, levels.toLogLevel('config'));
    assert.equal(levels.LEVEL_INFO,   levels.toLogLevel('info'));
    assert.equal(levels.LEVEL_WARN,   levels.toLogLevel('warn'));
    assert.equal(levels.LEVEL_ALL,    levels.toLogLevel('all'));
  });

  it('Should convert from anything input into a the default log level', function () {
    assert.equal(levels.DEFAULT_LEVEL, levels.toLogLevel(null));
    assert.equal(levels.DEFAULT_LEVEL, levels.toLogLevel());
    assert.equal(levels.DEFAULT_LEVEL, levels.toLogLevel('NONE'));
    assert.equal(levels.DEFAULT_LEVEL, levels.toLogLevel(false));
    assert.equal(levels.DEFAULT_LEVEL, levels.toLogLevel(true));
    assert.equal(levels.DEFAULT_LEVEL, levels.toLogLevel({}));
    assert.equal(levels.DEFAULT_LEVEL, levels.toLogLevel([]));
  });

  it('Should adjust the log level', function () {
    assert.equal(levels.LEVEL_NONE,   levels.adjustLevel(levels.LEVEL_NONE));
    assert.equal(levels.LEVEL_TRACE,  levels.adjustLevel(levels.LEVEL_TRACE));
    assert.equal(levels.LEVEL_DEBUG,  levels.adjustLevel(levels.LEVEL_DEBUG));
    assert.equal(levels.LEVEL_CONFIG, levels.adjustLevel(levels.LEVEL_CONFIG));
    assert.equal(levels.LEVEL_INFO,   levels.adjustLevel(levels.LEVEL_INFO));
    assert.equal(levels.LEVEL_WARN,   levels.adjustLevel(levels.LEVEL_WARN));
    assert.equal(levels.LEVEL_ALL,    levels.adjustLevel(levels.LEVEL_ALL));
  });

  it('Should adjust to the default log level', function () {
    assert.equal(levels.DEFAULT_LEVEL, levels.adjustLevel(23));
    assert.equal(levels.DEFAULT_LEVEL, levels.adjustLevel(-1));
    assert.equal(levels.DEFAULT_LEVEL, levels.adjustLevel(null));
    assert.equal(levels.DEFAULT_LEVEL, levels.adjustLevel(false));
    assert.equal(levels.DEFAULT_LEVEL, levels.adjustLevel({}));
    assert.equal(levels.DEFAULT_LEVEL, levels.adjustLevel([]));
    assert.equal(levels.DEFAULT_LEVEL, levels.adjustLevel());
  });

});
