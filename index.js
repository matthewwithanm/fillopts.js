'use strict';

var extend = require('xtend');


var fillopts = function (wrapped, opts) {
    opts = extend(wrapped.opts, opts);
    wrapped = wrapped.wrapped || wrapped;

    var fn = function (callOpts /*, args... */) {
        var newArgs,
            args = Array.prototype.slice.call(arguments, 1);
        newArgs = [extend(opts, callOpts)];
        newArgs.push(args);
        return wrapped.apply(this, newArgs);
    };

    fn.wrapped = wrapped;
    fn.opts = opts;

    return fn;
};


module.exports = fillopts;
