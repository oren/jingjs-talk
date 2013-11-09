// Control Flow in Node

// controlling the flow of an asynchronous program is very different than sequential language like Ruby.

// The feature we implemented was the mybooks homepage. This page displays all the collections of a user
// and the user's notes. It require 2 separate HTTP reqeusts to our API.
// The HTTP requests are not tied to each other so it make sense to run them in parallel and when both requests are done we want to render
// the html and send it to the browser.
//
// So the challenge we have is running a few async tasks in parallel and combining their results. Let's examine a few ways to achieve that.

