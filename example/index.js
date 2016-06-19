var Model = require('../')
var EventEmitter = require('events').EventEmitter
var bus = new EventEmitter()

var ExampleModel = Model({
    'increment': function (state, event) {
        return { count: state.count + 1 }
    },
    'add': function (state, event) {
        return { count: state.count + event.value }
    }
}, { count: 0 })

var exampleModel = ExampleModel(bus)

exampleModel(function onChange (state) {
    console.log('change', state)
})

bus.emit('increment')
bus.emit('add', { value: 10 })

module.exports = exampleModel
