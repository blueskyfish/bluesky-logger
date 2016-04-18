
![BlueSky Logger](logo.png)

BlueSky Logger
==============

Yet another logger for NodeJS. It is simple and easy to use.

> Having implemented this library three times in different projects, here is a new additional logger library.

Content
-------
* [Install](#user-content-install)
* [Configuration](#user-content-configuration)
* [Usage](#user-content-usage)
* [FAQ](#user-content-faq)
* [File Appender](#user-content-fileappender)
* [Logger](#user-content-logger)
* [Change from Version](#user-content-change-from-version)
* [History](#user-content-history)
* [License](#user-content-license)

## Install


```
$ npm install --save bluesky-logger
```

## Configuration

```js
var
  factory = require('bluesky-logger');

factory
  .config({
    'root': 'info',
    'com.example': 'debug',
    'com.example.services': 'config',
    'com.example.view': 'none',            // don't print any message
    'com.example.view.login': 'all',       // print every message
    'com.example.view.home': 'warn'
  })
  .setSeparator('.')
  .setWriter(function (logLevel, message) {
      // save the output
  });
```

### Log Level Hierarchy:

`none` < `trace` < `debug` < ` config` < `info` < `warn` < `all`

Example: `debug`
* `none` don't print the message
* `trace` don't print the message
* `debug` print the message
* all other levels: print the message

### Overview:

| level (string) | value (constant) | number | method             |
|----------------|------------------|--------|--------------------|
| none           | LEVEL_NONE       | 1000   | -                  |
| trace          | LEVEL_TRACE      | 5      | logger.trace(...)  |
| debug          | LEVEL_DEBUG      | 10     | logger.debug(...)  |
| config         | LEVEL_CONFIG     | 20     | logger.config(...) |
| info           | LEVEL_INFO       | 50     | logger.info(...)   |
| warn           | LEVEL_WARN       | 99     | logger.warn(...)   |
| all            | LEVEL_ALL        | 0      | -                  |

> The levels as string must be written in lowercase signs

## Usage

**Example 1:** *the log level for this logger is LEVEL_DEBUG*

```js
var
  logger = require('bluesky-logger').getLogger('com.example');

logger.trace('This is a short message');             // don't print the message
logger.debug('Hello', name, ', how are yout');       // print the message
logger.info('Important message');                    // print the message
logger.warn('Critical message', system.health);      // print the message
logger.config('Current User:', process.env['USER']); // print the message
```

**Example 2:** *the log level for this logger is LEVEL_CONFIG*

```js
var
  logger = require('bluesky-logger').getLogger('com.example.services.DateService');

logger.trace('This is a short message');             // don't print the message
logger.debug('Hello', name, ', how are yout');       // don't print the message
logger.info('Important message');                    // print the message
logger.warn('Critical message', system.health);      // print the message
logger.config('Current User:', process.env['USER']); // print the message
```

**Example 3:** *the log level for this logger is LEVEL_INFO*

```js
var
  logger = require('bluesky-logger').getLogger('com');

logger.trace('This is a short message');             // don't print the message
logger.debug('Hello', name, ', how are yout');       // don't print the message
logger.info('Important message');                    // print the message
logger.warn('Critical message', system.health);      // print the message
logger.config('Current User:', process.env['USER']); // don't print the message
```

**Example 4:** *is debug enable? Or other levels*

```js
var
  logger = require('bluesky-logger').getLogger('com.example');

if (logger.isDebugEnabled()) {
  logger.debug('output a large object: ', JSON.stringify(largeObject));
}
```

## FAQ

### Replace the default writer function:

```js
var factory = require('bluesky-logger');

factory.setWriter(function (logLevel, message) {
  var text = new Date().toString() + logLevel + message;
  fs.appendText('logger.txt', text);
});
```
### Reset to the default writer function:

```js
var factory = require('bluesky-logger');

factory.setWriter(null);
```

### Separate the namespace

```js
var factory = require('bluesky-logger');

factory.setSeparator(':');
// now: the namespace must be splited with ':'
// e.g. 'com:example:services:TestService'
```


### LoggerFactory chaining

The logger factory is able to chain the configuration steps.

```js
var factory = require('bluesky-logger');

factory
  .config({
    'root': 'info'
  })
  .setSeparator('-')
  .config({
    'example-service': 'debug',
    'example-util': 'config'
  })
  .setWriter(function (logLevel, message) {
    // ...
  });

var logger = factory.getLogger('example'); // log level is inherited from root "info"
```


## File Appender

The file appender is for writing the log message into a file. Every day a new file is created.

```js
var loggerFactory = require('bluesky-logger');
var fileAppender = require('bluesky-logger/file-appender');

var filer = fileAppender({
  path: 'path/to/the/logger',
  name: 'logger-filename',
  datePattern: 'YYYY-MM-DD',    // see node module "moment"
  timePattern: 'hh:mm:ss'       // see node module "moment"
});

loggerFactory
  .confif(...)
  .setSeparator(...)
  .setWriter(filer.appendMessage);
```

## Logger

Description of the methods from Logger class.

| method               | parameters | description
|----------------------|------------|----------------------------
| isTraceEnable()      | -          | `true` if the LEVEL_TRACE is enabled.
| isConfigEnabled()    | -          | `true` if the LEVEL_CONFIG is enabled.
| isDebugEnabled()     | -          | `true` if the LEVEL_DEBUG is enabled.
| isInfoEnabled()      | -          | `true` if the LEVEL_INFO is enabled.
| isWarnEnabled()      | -          | `true` if the LEVEL_WARN is enabled.
| trace(...)           | any        | print the trace message if the LEVEL_TRACE is enabled
| debug(...)           | any        | print the trace message if the LEVEL_DEBUG is enabled
| config(...)          | any        | print the trace message if the LEVEL_CONFIG is enabled
| info(...)            | any        | print the trace message if the LEVEL_INFO is enabled
| warn(...)            | any        | print the trace message if the LEVEL_WARN is enabled
| getLevel()           | -          | return the current level of the logger.
| getName()            | -          | return the last part of the namespace.

## Change from Version


The API has change from the version 0.2 to 0.3. In order to get a logger instance must
be called the function getLogger('name').

**Version 0.2.x**

```js
var logger = require('bluesky-logger');
```

**Version 0.3.x and above**

```js
var factory = require('bluesky-logger');
var logger = factory.getLogger('namespace');
// or call directly
var logger = require('bluesky-logger').getLogger('namespace');
```

## History

* 0.7.0 unit test for cache, pump lodash to 4.11.1, rewrite the cache module
* 0.6.3 fixed the lodash call "padStart".
* 0.6.1 update modules and refactory the file-appender
* 0.5.0 switch the dependency module from "strftime" to "dateformat". Improve the jsDoc.
* 0.4.1 add a new line sign to the file appender message.
* 0.4.0 add a file-appender to the libray.
* 0.3.0 Separate the configuration from the log message
* 0.2.2 improve the jsdoc
* 0.2.1 fixed the readme file and change the "lodash" library to "3.10.1"
* 0.2.0 add the "toLogLevel"
* 0.1.1 add trace level
* 0.0.1 first publishing

## License

```
The MIT License (MIT)

Copyright (c) 2016 BlueSkyFish

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
