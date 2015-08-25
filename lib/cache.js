/**
 * bluesky-logger - https://github.com/blueskyfish/bluesky-logger.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var levels = require('./levels');
var Logger = require('./logger');

var mCache = _defaultCache();
var mSeparator = '.';


function _defaultCache() {
  return {
    'root': {
      level: levels.DEFAULT_LEVEL,
      logger: new Logger('root', levels.DEFAULT_LEVEL)
    }
  };
}

function _reduceNamespace(namespace) {
  // split the namespace
  var list = namespace.split(mSeparator);

  // remove the last part
  list.pop();

  if (list.length === 0) {
    // namespace is empty --> return "root"
    // namespace "root" exist always!!
    return 'root';
  }
  return list.join(mSeparator);
}

function _extractName(namespace) {
  var list = namespace.split(mSeparator);
  if (list.length === 0) {
    return 'root';
  }
  return list.pop();
}

function _getLevel(namespace) {
  var item = mCache[namespace];
  if (item) {
    return item.level;
  }
  while (true) {
    namespace = _reduceNamespace(namespace);
    item = mCache[namespace];
    if (item) {
      return item.level;
    }
  }
}


var cache = module.exports = { };

cache.reset = function () {
  mCache = _defaultCache();
};

cache.add = function (namespace, level) {
  //console.log('add %s => %s', namespace, levels.toLogLevel(level));
  var item = mCache[namespace];
  if (!item) {
    item = mCache[namespace] = {};
  }
  item.level = levels.toLogLevel(level);
  if (item.logger) {
    delete item.logger;
  }
  //console.log(JSON.stringify(mCache, null, 2));
  return cache;
};


cache.getLogger = function (namespace) {
  var level;
  var item = mCache[namespace];

  if (item && item.logger) {
    return item.logger;
  }
  if (!item || !item.level) {
    level = _getLevel(namespace);
    if (!item) {
      item = mCache[namespace] = {};
    }
    item.level = level;
  }
  item.logger = new Logger(_extractName(namespace), item.level);
  return item.logger;
};

cache.setSeparator = function (sep) {
  if (typeof sep !== 'string' || sep.length === 0) {
    mSeparator = '.';
    return;
  }
  if (sep.length > 1) {
    sep = sep.substring(0,1);
  }
  mSeparator = sep;
};
