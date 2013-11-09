![browserify](http://substack.net/doc/hujs/07_browserify.png)

How do you organize your client side js code?  
The node.js guys adopted the CommonJS approach - each function in it's own file  
and you simply require the file you want to use:

saveUser.js

```js
module.exports = function(userId) {
  // save user in DB
  console.log('user' + userId + ' saved in DB');
};
```
   
app.js

```js
    var foo = require('./saveUser.js');  # foo contains a function that can save our user
    foo(1);                              # calling our function with a user id
```

great for code reuse and easy to test, right? true, but how is that relevant to client-side js?  
I am glad you asked. I use a tool called [browserify](https://github.com/substack/node-browserify) that let me use CommonJS in the browser!  
let's jump right in and show you how to use it.
go ahead and create app.js and saveUser.js from the code samples above.  

now add a simple index.html that uses app.js

```html
<!DOCTYPE html>
  <head>
  </head>

  <body>
    <p>CommonJS in the browser!</p>
   
     <script src="app.js"></script>
  </body>
</html>
```

if you look at the browser's console you will notice an error: `Uncaught ReferenceError: require is not defined`   
that makes sense, since require is not available for js client side. let's fix that with browserify.

browserify is a node.js package so just like any other node package, you got to have [node.js](http://nodejs.org) on your machine and you should use npm to install it:

    npm install browserify -g

adding -g tells node to install this package globaly - it will available anywhere and not only in the current directory.

lets see what happend when we give it one argument, our js file:

    browserify app.js

we see a long javascript code printed in the console. browserify did it's magic and wrap our file so it will be able to use our require function.  
that's nice but we need to save the output into a file, right? lets do that with -o

    browserify app.js > app.min.js

now we can use bundle.js insted of app.js in our html file:

```html
<!DOCTYPE html>
  <head>
  </head>

  <body>
    <p>CommonJS in the browser!</p>

    <script src="app.min.js"></script>
  </body>
</html>
```

if you see "user saved in DB" in the browser's console, everything is fine.

That's cool but I'm not going do this browserify dance every time I make a change to my js.  
There is a simple npm package called browserify-watcher that will run browserify on any change of my js files.  
Install it with `npm install browserify-watcher` and create this file:

```js
// watch.js

require('browserify-watcher')(
  './app.js' // bundles to `app.min.js`
)
```

Run it with `node watch.js` and you're done - when you change app.js, app.min.js will be generated.

that's it, you can leave the spaghetti for the kitchen and enjoy mess-free js code.
