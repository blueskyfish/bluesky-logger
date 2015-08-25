/**
 * Project: bluesky-logger
 */

'use strict';

var _ = require('lodash');

var cache = require('./lib/cache');
var writer = require('./lib/writer');

/**
 * @class LoggerFactory
 */
var factory = module.exports = {

  /**
   * @name config
   * @description
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
   * @return {LoggerFactory}
   */
  config: function (namespaces) {

    _.forEach(namespaces, function (level, namespace) {
      cache.add(namespace, level);
    });
    return factory;
  },

  /**
   * @name setSeparator
   * @description
   * set the separator for the namespaces.
   *
   * e.g. "." => namespace1.namespace2
   * e.g. "-" => namespace1-namespace2
   *
   * @param {string} sep the separator sign.
   * @return {LoggerFactory}
   */
  setSeparator: function (sep) {
    cache.setSeparator(sep);
    return factory;
  },

  /**
   * @name setWriter
   * @description
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
   * @return {LoggerFactory}
   */
  setWriter: function (writeFunc) {
    writer.setWriter(writeFunc);
    return factory;
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
