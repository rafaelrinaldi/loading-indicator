# idle.js

> Simple and customizable command line idle status indicator.

## Install

```sh
$ npm install --save idle.js
```

## Usage

### API

#### `Idle([options])`

##### `options`

##### `preset`

Type: `string`  
Default: `sticks`  

The visual preset you want.

Available values are:

* `sticks`
* `square`
* `circle`
* `dots`
* `bullets`
* `arrows`

##### `sequence`

Type: `string` or `array`  

Custom animation sequence. This value will override `preset`.

##### `delay`

Type: `number` _(milliseconds)_  
Default: `125`  

Delay for the render to be triggered.

##### `prefix`

Type: `string`  
Default: empty string  

String to be added to the begining of the output.

##### `suffix`

Type: `string`  
Default: empty string  

String to be added to the end of the output.

#### `idle.start()`

Start idle animation.

#### `idle.stop()`

Stop idle animation.

#### `idle.render()`

Render animation to the stream.  
This method is called internally so you don't need to manually call it.

## License

MIT © [Rafael Rinaldi](http://rinaldi.io)
