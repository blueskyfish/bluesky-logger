/**
 * bluesky-logger - https://github.com/blueskyfish/bluesky-logger.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2016 BlueSkyFish
 */

'use strict';

var levels = require('./levels');
var Logger = require('./logger');

var DEFAULT_SEPARATOR = '.';

var mCache = _defaultCache();
var mSeparator = DEFAULT_SEPARATOR;

module.exports = {

  /**
   * For unit tests
   */
  reset: function () {
    mCache = _defaultCache();
  },

  /**
   * Add a new namespace with the log level
   * @param {string} namespace
   * @param {string} level
   * @return {self}
   */
  add: function (namespace, level) {
    add_(namespace, level);
    return this;
  },

  getLogger: function (namespace) {
    return getLogger_(namespace);
  },

  setSeparator: function (sep) {
    setSeparator_(sep);
  }
};

function add_(namespace, level) {
  //console.log('add %s => %s', namespace, levels.toLogLevel(level));
  var item = mCache[namespace];
  if (!item) {
    item = mCache[namespace] = {};
  }
  item.level = levels.toLogLevel(level);
  if (item.logger) {
    // set the new log level!!
    item.logger.setLevel(item.level);
  }
  //console.log(JSON.stringify(mCache, null, 2));
}

function getLogger_(namespace) {
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
}

function setSeparator_(sep) {
  if (typeof sep !== 'string' || sep.length === 0) {
    mSeparator = DEFAULT_SEPARATOR;
  }
  else {
    if (sep.length > 1) {
      sep = sep.substring(0, 1);
    }
    mSeparator = sep;
  }
}


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
