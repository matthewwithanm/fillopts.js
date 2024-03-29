/*jshint strict:false */
/*globals describe, it */

var formatGreeting, formatGreeting2,
    assert = require('chai').assert,
    fillopts = require('../index');


formatGreeting = function (opts, punctuation) {
    return 'Hello, ' + opts.title + ' ' + opts.name + (punctuation || '');
};

formatGreeting2 = function (dummy, opts, punctuation) {
    return 'Hello, ' + opts.title + ' ' + opts.name + (punctuation || '');
};


describe('fillopts', function () {
    it('fills opts', function () {
        var filled = fillopts(formatGreeting, {title: 'Dr.', name: 'Crusher'});
        assert.equal(filled(), 'Hello, Dr. Crusher');
    });
    it('preserves args', function () {
        var filled = fillopts(formatGreeting, {title: 'Dr.', name: 'Crusher'});
        assert.equal(filled(null, '!'), 'Hello, Dr. Crusher!');
    });
    it('combines filled opts', function () {
        var filled = fillopts(
            fillopts(formatGreeting, {title: 'Dr.'}),
            {name: 'Crusher'}
        );
        assert.equal(filled(), 'Hello, Dr. Crusher');
    });
    it('overrides previous opts', function () {
        var filled = fillopts(
            fillopts(formatGreeting, {title: 'Dr.', name: 'Crusher'}),
            {name: 'Pulaski'}
        );
        assert.equal(filled(), 'Hello, Dr. Pulaski');
    });
    it("doesn't mutate the old function", function () {
        var filledA = fillopts(formatGreeting, {title: 'Dr.', name: 'Pulaski'}),
            filledB = fillopts(filledA, {name: 'Crusher'});
        assert.equal(filledA(), 'Hello, Dr. Pulaski');
        assert.equal(filledB(), 'Hello, Dr. Crusher');
    });
    it('fills opts in other positions', function () {
        var filled = fillopts(formatGreeting2, {title: 'Dr.', name: 'Crusher'}, 1);
        assert.equal(filled(), 'Hello, Dr. Crusher');
    });

    describe('withOpts', function () {
        it('adds opts', function () {
            var filled = fillopts(formatGreeting)
                .withOpts({title: 'Dr.', name: 'Crusher'});
            assert.equal(filled(), 'Hello, Dr. Crusher');
        });
        it('combines filled opts', function () {
            var filled = fillopts(formatGreeting)
                .withOpts({title: 'Dr.'})
                .withOpts({name: 'Crusher'});
            assert.equal(filled(), 'Hello, Dr. Crusher');
        });
        it('overrides previous opts', function () {
            var filled = fillopts(formatGreeting)
                .withOpts({title: 'Dr.', name: 'Crusher'})
                .withOpts({name: 'Pulaski'});
            assert.equal(filled(), 'Hello, Dr. Pulaski');
        });
        it("doesn't mutate the old function", function () {
            var filledA = fillopts(formatGreeting, {title: 'Dr.', name: 'Pulaski'}),
                filledB = filledA.withOpts({name: 'Crusher'});
            assert.equal(filledA(), 'Hello, Dr. Pulaski');
            assert.equal(filledB(), 'Hello, Dr. Crusher');
        });
    });
});
