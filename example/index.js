var Model = require('../')

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

module.exports = exampleModel
