var EE = require('events').EventEmitter
var struct = require('observ-struct')
var xtend = require('xtend')

module.exports = apply

function apply () {
    var args = [].slice.call(arguments)

    return args.length === Model.length ?
        Model.apply(null, args) :
        function () {
            return apply.apply(null, args.concat([].slice.call(arguments)))
        }
}

function Model (hash, initState, bus) {
    var state = struct(initState)

    Object.keys(hash).forEach(function (k) {
        bus.on(k, function () {
            var args = [].slice.call(arguments)
            state.set(hash[k].apply(null, [state()].concat(args)))
        })
    })

    function model () {
        return state.apply(null, arguments)
    }

    model.bus = bus
    return model
}

