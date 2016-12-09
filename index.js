//触摸事件处理
var Event = require('super-event');
var domEventHelper = require('dom-event-helper');

function Touch(el) {
    Event.call(this);
    this.el = el || document;
    this.touch = null;
    this.lastTimestamp = Date.now();
    this.spend = 0;
    this.x1 = this.y1 = this.x2 = this.y2 = undefined;
}

Touch.prototype = Object.create(Event.prototype, {
    'constructor': {
        value: Touch
    }
});

Touch.prototype._add = function () {
    domEventHelper.add(this.el, 'touchstart', this.touchStart.bind(this), false);
    domEventHelper.add(this.el, 'touchmove', this.touchMove.bind(this), false);
    domEventHelper.add(this.el, 'touchend', this.touchEnd.bind(this), false);
    domEventHelper.add(this.el, 'touchcancel', this.touchCancel.bind(this), false);
};

Touch.prototype._remove = function () {
    domEventHelper.remove(this.el, 'touchstart');
    domEventHelper.remove(this.el, 'touchmove');
    domEventHelper.remove(this.el, 'touchend');
    domEventHelper.remove(this.el, 'touchcancel');
};

Touch.prototype.touchStart = function (e) {
    this.lastTimestamp = Date.now();
    var touch = e.touches[0];
    this.touch = touch;
    this.touch.el = 'tagName' in touch.target ?
        touch.target : touch.target.parentNode;

    this.x2 = this.x1 = touch.pageX;
    this.y2 = this.y1 = touch.pageY;
    this.trigger('touch:start', {
        x1: this.x1,
        y1: this.y1,
        e: e,
        el: this.touch.el,
        timestamp: this.lastTimestamp
    });
};

Touch.prototype.touchMove = function (e) {
    this.spend = Date.now() - this.lastTimestamp;
    var touch = e.touches[0];
    var yrange = 0;
    var xrange = 0;
    if (this.y2) {
        yrange = this.y2 - touch.pageY;
        xrange = this.x2 - touch.pageX;
    }

    this.x2 = touch.pageX;
    this.y2 = touch.pageY;

    this.trigger('touch:move', {
        x1: this.x1,
        y1: this.y1,
        x2: this.x2,
        y2: this.y2,
        e: e,
        toUp: yrange > 0,
        toLeft: xrange > 0,
        xrange: xrange,
        yrange: yrange,
        spend: this.spend
    });
};

Touch.prototype.touchEnd = function (e) {
    this.spend = Date.now() - this.lastTimestamp;
    this.trigger('touch:end', {
        x1: this.x1,
        y1: this.y1,
        x2: this.x2,
        y2: this.y2,
        dir: swipeDirection(this.x1, this.x2, this.y1, this.y2),
        e: e,
        spend: this.spend
    });
};

Touch.prototype.touchCancel = function () {
    //this.pause('touch:start touch:move touch:end');
    this.trigger('touch:cancel', {
        x1: this.x1,
        y1: this.y1,
        x2: this.x2,
        y2: this.y2,
        dir: swipeDirection(this.x1, this.x2, this.y1, this.y2),
        spend: this.spend
    });
    this.spend = 0;
    this.touch = null;
    this.x1 = this.y1 = this.x2 = this.y2 = undefined;
};

Touch.prototype.start = function () {
    this._add();
    var _this = this;

    domEventHelper.add(window, 'scroll', function (e) {
        // this.touchCancel();
        _this.trigger('scroll', e);
    }, false);

    //重新绑定dom
    this.on('touch:el', function (e) {
        _this._remove();
        _this.el = el;
        _this._add();
    });
};

Touch.prototype.destroy = function () {
    this._remove();
    domEventHelper.remove(window);
}

function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >=
    Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down')
}

module.exports = Touch;