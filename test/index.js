var test = require('tape');
var Store = require('../');

var store = Store({ count: 0 });
var unsubscribe;

test('obvi', function (t) {
    t.plan(6);

    var pushEvent = store({
        add: function (state, event) {
            t.deepEqual(event, { value: 2 },
                'should map add event');
            t.deepEqual(state, { count: 0 }, 'should pass previous state');
            return { count: state.count + event.value };
        },
        increment: function (state, event) {
            t.deepEqual(event, { type: 'increment' },
                'should map increment event');
            t.deepEqual(state, { count: 2 }, 'should update state');
            return { count: state.count + 1 };
        }
    });

    var called = 0;
    unsubscribe = store.state(function onChange (state) {
        if (called === 0) {
            t.deepEqual(state, { count: 2 }, 'should emit new state');
        }
        if (called === 1) {
            t.deepEqual(state, { count: 3 }, 'should emit new state');
        }
        called++;
    });

    pushEvent('add', { value: 2 });
    pushEvent('increment', { type: 'increment' });
});

test('events have separate channels', function (t) {
    t.plan(1);
    unsubscribe();
    var push = store({
        increment: function (state, ev) {
            return { count: state.count + 10 };
        }
    });

    unsubscribe = store.state(function onChange (state) {
        t.deepEqual(state, { count: 13 },
            'should handle separate event channels');
    });

    push('increment')
});

