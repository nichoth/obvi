var struct = require('observ-struct')
var model = require('./')

var s = struct({
    inHere: model
})
s(console.log.bind(console, 'change'))

model.bus.emit('add', { value: 13 })
