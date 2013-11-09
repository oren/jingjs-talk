// TLDR: spaghetti belong to the kitchen, not your client-side code.

// How do you organize your client side js code?
// The node.js guys adopted the CommonJS approach - each function in it's own file
// and you simply require the file you want to use:

// let's create 2 js files:
// 1. saveUser.js

module.exports = function(userId) {
  // save user in DB
  console.log('user ' + userId + ' saved in DB');
};

// 2. app.js

var foo = require('./save_user.js');  // foo contains a function that can save our user
foo(1);                              // calling our function with a user id
