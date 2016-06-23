var struct = require('observ-struct')

module.exports = Model

function Model (hash, initState) {
    var state = struct(initState)
    hash = hash || {};

    function model () {
        return state.apply(null, arguments)
    }

    model.emit = function (action) {
        if (hash[action]) {
            var args = [state()].concat([].slice.call(arguments, 1))
            state.set(hash[action].apply(null, args))
        }
    }

    return model
}

