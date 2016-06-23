# obvi

Observable state machine

## install

    $ npm install obvi

## example

```js
var Model = require('obvi')

var exampleModel = Model({
    'increment': function (state, event) {
        return { count: state.count + 1 }
    },
    'add': function (state, event) {
        return { count: state.count + event.value }
    }
}, { count: 0 })

exampleModel(function onChange (state) {
    console.log('change', state)
})

exampleModel.emit('increment')
exampleModel.emit('add', { value: 10 })
```

The model is an instance of `observ`, and can be composed normally:

```js
var Struct = require('observ-struct')
var struct = Struct({
    foo: exampleModel
})
```
