

BlueSky Logger
==============

Yet an other logger for NodeJS. It is simple and easy to use.

After three time implemented the same functionality, I put this into a library and use this.

Usage
-----

```js
var
  logger = require('bluesky-logger');

// set the level
logger.setLevel(logger.LEVEL_INFO);

logger.debug('Hello', name, ', how are yout');
logger.info('Important message');
logger.warn('Critical message', system.life);
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

License
-------

    The MIT License (MIT)
