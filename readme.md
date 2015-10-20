
![BlueSky Logger](logo.png)

BlueSky Logger
==============

Yet another logger for NodeJS. It is simple and easy to use.

> Having implemented this library three times in different projects, here is a new additional logger library.

Content
-------
* [Install](#install)
* [Configuration](#configuration)
* [Usage](#usage)
* [FAQ](#faq)
* [File Appender](#fileappender)
* [Logger](#logger)
* [Change from 0.2.x to 0.3.x](#change)
* [History](#history)
* [License](#license)

## <a name="install"></a> Install


```
$ npm install --save bluesky-logger
```

## <a name="configuration"></a> Configuration

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

## <a name="usage"></a> Usage

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

## <a name="faq"></a> FAQ

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


## <a name="fileappender"></a> File Appender

The file appender is for writing the log message into a file. Every day a new file is created.

```js
var loggerFactory = require('bluesky-logger');
var fileAppender = require('bluesky-logger/file-appender');

var filer = fileAppender({
  path: 'path/to/the/logger',
  name: 'logger-filename'
});

loggerFactory
  .confif(...)
  .setSeparator(...)
  .setWriter(filer.appendMessage);
```

## <a name="logger"></a> Logger

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

## <a name="change"></a> Change from 0.2.x to 0.3.x


The API has change from the version 0.2 to 0.3. In order to get a logger instance must
be called the function getLogger('name').

**Version 0.2.x**

```js
var logger = require('bluesky-logger');
```

**Version 0.3.x**

```js
var factory = require('bluesky-logger');
var logger = factory.getLogger('namespace');
// or call directly
var logger = require('bluesky-logger').getLogger('namespace');
```

## <a name="history"></a> History

* 0.4.1 add a new line sign to the file appender message.
* 0.4.0 add a file-appender to the libray.
* 0.3.0 Separate the configuration from the log message
* 0.2.2 improve the jsdoc
* 0.2.1 fixed the readme file and change the "lodash" library to "3.10.1"
* 0.2.0 add the "toLogLevel"
* 0.1.1 add trace level
* 0.0.1 first publishing

## <a name="license"></a> License

    The MIT License (MIT)
