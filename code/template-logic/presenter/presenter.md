# Keeping UI logic in a Presenter

Like most good things in life, your new shiny web app started clean and maintainable.
After a few months of adding features you realize that you have a lot of messy code in 2 places:

1. The functions that act on the HTTP requests (Express and Sintra calls it a route or a handler and Rails calls it a controller).
1. The Templates that is being rendered into HTML (Jade, EJS, Haml, ERB etc).

Upon further investigation you discover formatting logic inside your templates and in your routes and also functions that do all kind of computations. Not only it's hard to add new features but it's almost impossible to test those functions. That's where Presenters can help. You might heard about MVP (Model-view-presenter) pattern but this is not going to be a discussion about design patterns so look up this term if you are curious. The practical aspect of a Presenter is to encapsulate the UI logic into an object that you pass into your template. Inside the template you'll be able to call functions of the this object.

This pattern also allows developers to work on the UI logic without waiting for the designer to finish their layouts. It's also easy to mock a Presenter if the API for a feature is not ready.

In this post we'll use [jade](https://github.com/visionmedia/jade), but it can apply other template engines es well (such as [ejs](http://embeddedjs.com/)). We'll start with an example of passing a presenter into a jade template and finish with a simple express app.

## Basic example

*This code example is available [here](https://github.com/oren/oren.github.io/tree/master/posts/presenter/basic-example)*

`npm install jade`

```jade
// index.jade

doctype 5
html(lang="en")
  head
    title crickets are yummy
  body
    h1 yo
    #container
      p #{user.title()} #{user.name()}, You are amazing
```

```js
// index.js

'use strict';
/*jslint node: true */

var jade = require('jade');

var UserPresenter = function (data) {
    this.data = data;
};

UserPresenter.prototype = {
    name: function() {
        return this.data.name || '';
    },

    title: function() {
        return this.data.title || '';
    }
};

var user = new UserPresenter({ name: 'Josh', title: 'Sir' });
var html = jade.renderFile('index.jade', { user: user });

console.log(html);
```
Run it with `node index.js` and you should see a string of html with Sir josh inside the p element:

```html
<!DOCTYPE html>

<html lang="en">
  <head><title>crickets are yummy</title></head>
  <body>
    <h1>yo</h1>
	  <div id="container"><p>Sir Josh, You are amazing</p></div>
	</body>
</html>
```

The basic idea is to pass an object to the template. It's being done using `jade.renderFile`.
Our `user` object have functions that we call within the template like `user.name()`.

Our example is very simple, but Presenters are very helpful when you're dealing with complex json objects.

Let's build an express application and use a Presenter with a jade template.

## Example with express.js

*This code example is available [here](https://github.com/oren/oren.github.io/tree/master/posts/presenter/express-example)*

Setup a basic express app:

```bash
sudo npm install -g express
express express-example
cd express-example
npm install
```

`mkdir presenters`  
Create a user presenter function:

```js
// presenters/user.js

var Presenter = function (data) {
    this.data = data;
};

Presenter.prototype = {
    name: function() {
        return this.data.name || '';
    },

    title: function() {
        return this.data.title || '';
    }
};

module.exports = Presenter;

```

Replace views/index.js with our version:

```jade
doctype 5
html(lang="en")
  head
    title crickets are yummy
  body
    h1 yo
    #container
      p #{user.title()} #{user.name()}, You are amazing
```

Replace routes/index.js:

```js
var UserPresenter = require('../presenters/user.js');

exports.index = function(req, res){
  // in the real world userData should come from a db or a service
  var userData = { name: 'Josh', title: 'Sir' };

  res.render('index', { user: new UserPresenter(userData) });
};
```

And view the website here: [0.0.0.0:3000](http://localhost:3000)

Notice that express comes with jade so we didn't install it separately. Also notice the `res.render()`. This is a helper function that allow us to render a template with some object.

There are a few more things I wanted to talk about - using ECMAScript 5 getters to simplify our templates and using idiomatic JavaScript for the Presenter object (instead of the new keyword) But this is already too long so I'll write about those in another post.
