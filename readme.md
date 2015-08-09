
![BlueSky Logger](logo.png)

BlueSky Logger
==============

Yet another logger for NodeJS. It is simple and easy to use.

> Having implemented this library three times in different projects, here is a new additional logger library.

Install
-------

```
$ npm install --save bluesky-logger
```

Usage
-----

```js
var
  logger = require('bluesky-logger');

// set the level
logger.setLevel(logger.LEVEL_INFO);

logger.debug('Hello', name, ', how are yout');
logger.info('Important message');
logger.warn('Critical message', system.health);
logger.config('Current User:', process.env['USER']);
```

FAQ
---

### Replace the default writer function:

```js
logger.setWriter(function (out) {
  fs.appendTo(loggerFilename, out);
});
```
### Reset to the default writer function:

```js
logger.setWriter(null);
```


History
-------

0.0.1 first publishing
0.1.1 add trace level

License
-------

    The MIT License (MIT)
