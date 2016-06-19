# obvi

Observable state machine

## install

    $ npm install obvi

## example

```js
var Model = require('obvi')
var EventEmitter = require('events').EventEmitter
var bus = new EventEmitter()

// pass in event handlers and initial state
var ExampleModel = Model({
    'increment': function (state, event) {
        // return state object
        return { count: state.count + 1 }
    },
    'add': function (state, event) {
        return { count: state.count + event.value }
    }
}, { count: 0 })

// pass an event emitter
var exampleModel = ExampleModel(bus)

// listen to changes
exampleModel(function onChange (state) {
    console.log('change', state)
})

bus.emit('increment')
bus.emit('add', { value: 10 })

// get current state
exampleModel()
```

The model is an instance of `observ`, and can be composed normally:

```js
var Struct = require('observ-struct')
var struct = Struct({
    foo: model
})
```

Partially apply in various ways:

```js
var Model = require('obvi')
var model = Model(hash)(initState)(bus)
var model = Model(hash, initState)(bus)
var model = Model(hash, initState, bus)
```
