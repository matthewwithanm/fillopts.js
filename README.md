fillopts
========

Partially applied functions are really cool. However, partial application
doesn't work too well for functions that use objects to emulate named arguments.
Since that's such a common idiom in JS, we made this library to handle it.

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
