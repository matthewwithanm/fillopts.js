'use strict';

var extend = require('xtend');


var fillopts = function (wrapped, opts, position) {
    position = position || 0;
    var optsList = wrapped.optsList ? wrapped.optsList.slice(0) : [];
    optsList[position] = extend(optsList[position], opts);
    wrapped = wrapped.wrapped || wrapped;

    var fn = function () {
        var i, arg,
            args = [],
            len = Math.max(arguments.length, optsList.length);
        for (i = 0; i < len; i++) {
            arg = arguments[i];
            args.push(optsList[i] ? extend(optsList[i], arg) : arg);
        }
        return wrapped.apply(this, args);
    };

    fn.wrapped = wrapped;
    fn.optsList = optsList;

    fn.withOpts = function (moreOpts, position) {
        return fillopts(fn, moreOpts, position);
    };

    return fn;
};


module.exports = fillopts;
