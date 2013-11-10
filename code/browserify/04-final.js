// TLDR: spaghetti belong to the kitchen, not your client-side code.

// How do you organize your client side js code?
// The node.js guys adopted the CommonJS approach - each function in it's own file
// and you simply require the file you want to use:

// let's create 2 js files:
// 1. save_user.js

module.exports = function(userId) {
  // save user in DB
  console.log('user ' + userId + ' saved in DB');
};

// 2. app.js

var save = require('./saveUser.js');  // foo contains a function that can save our user
save(1);                              // calling our function with a user id

// let's try using it in the browser - add a simple index.html that uses app.js

<!DOCTYPE html>
  <head>
  </head>

  <body>
    <p>CommonJS in the browser!</p>

     <script src="app.js"></script>
  </body>
</html>

// if you look at the browser's console you will notice an error: `Uncaught ReferenceError: require is not defined`
// that makes sense, since require is not available for js client side. let's fix that with browserify.

```
npm install browserify -g
browserify app.js > bundle.js
```

// now we can use bundle.js insted of app.js in our html file:

<!DOCTYPE html>
  <head>
  </head>

  <body>
    <p>CommonJS in the browser!</p>

    <script src="bundle.js"></script>
  </body>
</html>

// if you see "user 1 saved in DB" in the browser's console, everything is fine.
