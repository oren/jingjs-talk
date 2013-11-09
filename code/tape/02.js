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

var saveUser = require('./save_User.js');
saveUser({name: 'rose'});

