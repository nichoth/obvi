var struct = require('observ-struct');

// (object) => fn store
function Store (initState) {
    var state = struct(initState);

    // (object) => fn sendEvent
    function store (actions) {
        return function pushEvent (evName, arg) {
            var newState = actions[evName](state(), arg);
            state.set(newState);
        };
    }

    store.state = state;
    return store;
}

module.exports = Store;
