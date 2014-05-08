fillopts
========

Partially applied functions are really cool. However, partial application
doesn't work too well for functions that use objects to emulate named arguments.
Since that's such a common idiom in JS, we made this library to handle it.

```javascript
var getJSON = fillopts(xhr)
    .withOpts({
        method: 'GET',
        headers: {'Accept': 'application/json'}
    });
getJSON({url: 'http://example.com/whatever.json'}, ...);
```

Installation
------------

[browserify] and [webpack] users can simply `npm install fillopts`.

[Bower] users can `bower install fillopts`.

You can also just download the fillopts.js file from the standalone directory in
the repository.


Usage
-----

```javascript
var
  xhr = require('some-xhr-lib'),
  fillopts = require('fillopts'); // Or use the global or AMD in the browser.

// Create a new function with some options prefilled.
var myXHR = fillopts(xhr, {method: 'GET'});

// Call our function with some more options.
myXHR({url: 'http://example.com'}, callback);

// The above is equivalent to this:
xhr({method: 'GET', url: 'http://example.com'}, callback);
```

or use chaining:

```javascript
var myXHR = fillopts(xhr).withOpts({method: 'GET'});

myXHR({url: 'http://example.com'}, callback);
```

You can also fill opts that aren't in the first position by passing an index.
All of the following are equivalent:

```javascript
fillopts(f, {name: 'Crusher'}, 1)();
fillopts(f).withOpts({name: 'Crusher'}, 1)();
f(undefined, {name: 'Crusher'});
```


[browserify]: http://browserify.org
[webpack]: http://webpack.github.io
[Bower]: http://bower.io
