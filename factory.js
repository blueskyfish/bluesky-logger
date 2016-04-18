/**
 * bluesky-logger - https://github.com/blueskyfish/bluesky-logger.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2016 BlueSkyFish
 */

'use strict';

var _ = require('lodash');

var cache = require('./lib/cache');
var writer = require('./lib/writer');

module.exports = {

  /**
   * set the namespaces configuration.
   *
   * Config object
   * ```
   * {
   *   'root': 'all',
   *   'namespace1.namespace2': 'info',
   * }
   * ```
   *
   * **root** namespace is for all unknown namespaces.
   *
   * @param {object} namespaces the map with the namespace and its log level
   * @return {self}
   */
  config: function (namespaces) {
    _.forEach(namespaces, function (level, namespace) {
      cache.add(namespace, level);
    });
    return this;
  },

  /**
   * set the separator for the namespaces.
   *
   * e.g. "." => namespace1.namespace2
   * e.g. "-" => namespace1-namespace2
   *
   * @param {string} sep the separator sign.
   * @return {self}
   */
  setSeparator: function (sep) {
    cache.setSeparator(sep);
    return this;
  },

  /**
   * set write function.
   *
   * Signature of the write function:
   * ```
   * function (logName, message) {
   *    //
   * }
   * ```
   *
   * @param {function|null} writeFunc
   * @return {self}
   */
  setWriter: function (writeFunc) {
    writer.setWriter(writeFunc);
    return this;
  },

  /**
   * @name getLogger
   * @description
   * get a logger instance to the given namespace
   *
   * @param {string} [namespace]
   * @return {Logger}
   */
  getLogger: function (namespace) {
    return cache.getLogger(namespace || 'root');
  }
};
