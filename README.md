# loading-indicator [![Build Status](https://travis-ci.org/rafaelrinaldi/loading-indicator.svg?branch=master)](https://travis-ci.org/rafaelrinaldi/loading-indicator)

> Simple and customizable command line loading indicator.

## Install

```sh
$ npm install loading-indicator --save
```

## Usage

```javascript
var LoadingIndicator = require('loading-indicator');
var spin = new LoadingIndicator();

spin.start();
```

## API

### `new LoadingIndicator([options])`

### `options`

Type: `object`  

Available options.

#### `options.preset`

Type: `string`  
Default: `sticks`  

The visual preset you want.

Available values are:

* `sticks`
* `circle`
* `dots`
* `bullets`
* `arrows`

#### `options.sequence`

Type: `string` or `array`  

Custom animation sequence. This value will override `preset`.

##### `options.delay`

Type: `number` _(milliseconds)_  
Default: `125`  

Delay for the render to be triggered.

##### `options.prefix`

Type: `string`  
Default: empty string  

String to be added to the begining of the output.

##### `options.suffix`

Type: `string`  
Default: empty string  

String to be added to the end of the output.

#### `loadingIndicator.start()`

Start loading animation.

#### `loadingIndicator.stop()`

Stop loading animation.

#### `loadingIndicator.render()`

Render animation to the stream.  
This method is called internally so you don't need to manually call it.

## License

MIT © [Rafael Rinaldi](http://rinaldi.io)
