// Client and Server tests looks the same with the Tape and Browserify

// [tape](https://github.com/substack/tape)

// Let's say we have the following 3 files:

// 1. index.html

<!--index.html-->

<!DOCTYPE html>
<html lang="en">
  <head>
  </head>
  <body>
    <p>CommonJS in the browser!</p>

    <script src="bundle.js"></script>
  </body>
</html>

// 2. app.js

var saveUser = require('./save_user.js');
saveUser({name: 'rose'});

// 3. save_user.js

module.exports = function(user, cb) {
  // save user in our DB. in the real scenario this will be an async call to an http endpoint
  setTimeout(function() {
    console.log('user ' + user.name + ' was saved in the db');
    cb && cb(200);
  });
};


```
npm install browserify -g
browserify app.js > bundle.js
```

// Great, and now let's see how we can use tape to test our saveUser.js.
// Create a folder called test and add this file:


// test-save_user.js

var test = require('tape');

var saveUser = require('../save_user.js');

test('save user', function (t) {
  t.plan(1);  // you have to declare how many assertions are in your test

  saveUser({name: 'joe'}, function(result){
    t.equal(result, 200);  // using the === operator
  });
});

// To run our test we need to install tape - `npm install tape`.
// We run our test with `node test/test-saveUser.js` and should see output similar to  this:

// # save user
// user joe was saved in the db
// ok 1 should be equal

// 1..1
// # tests 1
// # pass  1
