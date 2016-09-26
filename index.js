//触摸事件处理
var Event = require('super-event');

function Touch() {
    Event.call(this);
}

Touch.prototype = Object.create(Event.prototype, {
    'constructor': {
        value: Touch
    }
});

var t = new Touch();
for (var key in t) {
    console.log(key);
}
console.log('-->',Touch.prototype.constructor);