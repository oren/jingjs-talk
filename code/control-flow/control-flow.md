## Control Flow in Node

Last week we had an interesting discussion over a pull request.
I think it's worth documenting the different approaching we talked about since controlling the flow
of an asynchronous program is very different than sequential language like Ruby.

The feature we implemented was the mybooks homepage. This page displays all the collections of a user
and the user's notes. It require 2 separate HTTP reqeusts to Bento (it might be only one in the near future).
The HTTP requests are not tied to each other so it make sense to run them in parallel and when both requests are done we want to render
the html and send it to the browser.

So the challenge we have is running a few async tasks in parallel and combining their results. Let's examine a few ways to achieve that.

### Version 1 - Using a counter
Here is the first code we wrote (removed some lines to make it readable)

```js
'use strict';

var MybookPresenter = require('yp/presenters/mybook');

function index(req, res) {
    var callbackCounter = 0;
    var dict = {};

    var getCollections = require('yp/services/mybook/collections')(req).all;
    var getNotes = require('yp/services/mybook/notes')(req).all;

    var params = {
        user_id: userID,
        vrid: req.tracking.vrid,
    };

    function respondCollections(err, response) {
        if (err) { return res.send(500); }

        dict.Collections = response.json['Collections'];
        done();
    }

    function respondNotes(err, response) {
        if (err) { return res.send(500); }

        dicts.Notes = response.json;
        done();
    }

    function done() {
        callbackCounter += 1;
        if (callbackCounter === 2) {
            res.template('mybook/index', { mybook: new MybookPresenter(dict) });
        }
    }

    // get stuff from Bento
    getNotes(params, respondNotes);
    getCollections(params, respondCollections);
}
```

Notice the `done` function and the counter that tells us when both of our functions finish their work.

### Version 2 - Using a control flow library (async)

Here is the same code (minus the first few lines), but with the help of the most popular control flow library - [async](https://github.com/caolan/async).

```js
// results is now equal to: { collection: <some object>, notes: <some object> }
function onComplete(err, results) {
    if (err) { return res.send(500); }

    var dict = {
        Collections: results.collections.json['Collections'],
        Notes: results.notes.json
    };

    res.template('mybook/index', { mybook: new MybookPresenter(dict) });
}

async.parallel({
  collections: function (callback) {
      getCollections(params, function (err, results) {
          callback(err, results);
      });
  },

  notes: function (callback) {
      getNotes(params, function (err, results) {
          callback(err, results);
      });
  }

}, onComplete);

```

The helper function `parallel` will run each function inside the hash we passed into it and when both are done it calls onComplete with `results`.
results will hold the return values of both our functions. Notice that the 2 functions must accept one argument - a callback.

Version 3 and 4 are not directly related to controll flow, but it's important to understand it as well and those concept can be found in other places of the codebase.

#### Version 3 - Using async and a partial application library (par)

Now let's see another variation, now with async and also a library called [par](https://npmjs.org/package/par).
Before explaining what par is doing let's look at the code.

```js
function onComplete(err, results) {
    if (err) { return res.send(500); }

    var dict = {
	Collections: results.collections.json['Collections'],
	Notes: results.notes.json
    };

    res.template('mybook/index', { mybook: new MybookPresenter(dict) });
}

async.parallel({
    collections: par(getCollections, params),
    notes: par(getNotes, params)
}, onComplete);

```
The only difference between this version and the previous one is this looks a bit cleaner.
We simplify it thanks to par - `getCollection` expects (params, callback) but async expect only callback.
par helps us bridge this gap.

Let's look at `par(getCollection, params)`. Notice that we pass a function as the first argument.
This function is in services/mybook/collection.js:

```js
function all(options, callback) {
    var url = '/my_book/collections';
    var params = sanitizeParams(options);

    bento.get(url, { qs: params }, callback);
}
```

The return value of par is the same function, `all` but with only 1 parameter - a callback. The first parameter, `options` was set to be `params` by par.
So now we have:

```js
function all(callback) {
    var url = '/my_book/collections';
    var params = sanitizeParams({ 'access_token': accessToken, 'vrid': req.tracking.vrid });

    bento.get(url, { qs: params }, callback);
}
```
If you remember from the previous code, the async library we use, want us to pass a function with one parameter, a callback. and guess what? that's exactly the return value of par.

Now after you understand what par is doing, you should be aware that the idea of returning a function with less parameters is not new and it also have a name - **partial application**.
The idea is to bind the first parameter of a function and create another function that accept less parameters (in our case we went from 2 parameters to 1).

#### Version 4 - Using async and a bind()

Here is another version of the code above, but now instead of using par we use the built-in ECMAScript 5 function called `bind`. 

```js
async.parallel({
    collections: getCollections.bind(null, params),
    notes: getNotes.bind(null, params)
}, onComplete);
```

bind is very similar to the par library that we used in our previous example. It returns a new function with less parameters than the original one.
bind's first parameter is the context (which we don't care about in our case since we don't use `this` inside getCollection), and the second parameter will set getCollection with params.

Some developers prefer to only use bind for the purpose of context binding (where the first parameter set 'this' to whatever you want) and not for partial application.

### TLDR
We use Version 3 - async + par