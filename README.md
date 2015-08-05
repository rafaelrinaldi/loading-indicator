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

##### `moonwalk` ![moonwalker](http://tgnp.me/wp-content/uploads/2011/10/lunapic_132009218615037_5.gif)

Type: `boolean`  
Default: `false`  

Whether or not to moonwalk when the last step of the animation is reached.  
This is specially useful for creating smooth animation loops.

#### `idle.start()`

Start idle animation.

#### `idle.stop()`

Stop idle animation.

#### `idle.render()`

Render animation to the stream.  
This method is called internally so you don't need to manually call it.

## License

MIT © [Rafael Rinaldi](http://rinaldi.io)
