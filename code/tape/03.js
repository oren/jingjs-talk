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

    <script src="app.js"></script>
  </body>
</html>

// 2. app.js

var saveUser = require('./save_user.js');
saveUser({name: 'rose'});

// 3. saveUser.js

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
