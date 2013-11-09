# Sometimes all you want is a Banana

## What?

In the last few days we changed to the way we render html on the server.
Previously we wrapped the JSON we get from Bento in a Presenter object and passed it into the Jade templates.
You can read about it [here](https://github.com/oren/oren.github.io/blob/master/posts/presenter/presenter.md).  
We decided to dump the Presenters and instead use small helper functions that act on simple JavaScript Hashes.

## Why?

1. **Complexity** - Some pages display different variation of the same data. It forced us to use inheritance as a way to share common functionality and it quickly became a maintenance nightmare.
Here is one ugly example of a 3 levels hierarchy we had: nearby_listing -> listing -> base_listing.
1. **Bloat** - The Presenters were overweight. Listing presenter is 1000 lines of 150 functions.
1. **Testability** - [God objects](http://en.wikipedia.org/wiki/God_object) are doing too many thing and are painful to test.
1. **Flexibility** - Changes in Bento API require changes in multiple Presenters since they assume a given JSON structure.
Bento is about to allow clients to ask for more granular pieces of data. Breaking the Presenter into small functions will make our app more flexible for API changes.

The following quotes are spot-on:  

> "The problem with object-oriented languages is they’ve got all this implicit environment that they carry around with them. You wanted a banana but what you got was a gorilla holding the banana and the entire jungle." - Joe Armstrong

> "Sometimes, the elegant implementation is just a function. Not a method. Not a class. Not a framework. Just a function." - John Carmack

## Example

Let's look at the SRP page as an example for the new approach.

handlers/srp.js
```js
// Helper functions
var serviceAreaHelper = require('yp/helpers/search/service_area');
var addressHelper = require('yp/helpers/listings/address');
var organicHelper = require('yp/helpers/search/organic');
var adsHelper = require('yp/helpers/srp/ads');

// Model object with .load function. you'll see what it's doing later
var srpModel = require('yp/models/srp');

// assume that we already made http call to Bento
var results =  { JSON from Bento };

// Define explicitly which helpers we want to use.
var helpers = {
    serviceArea: serviceAreaHelper,
    address: addressHelper,
    organic: organicHelper,
    ads: adsHelper
};

// Make helpers availabe to the srp.jade file
res.locals(helpers);

// Each model has a a `load` function that transofrm the raw JSON we get from Bento 
// into a nicer hash - it flattens it and do some type conversions if needed.
// for example, instead of srpModel.data.SearchResul.BusinessListing we have srpModel.organic
res.template('srp', {
    srpModel: srpModel.load(results),
    params: params
});
```

Here is the jade file that uses the ads helpers. Notice that we pass simple object as a parameter to `ads.rightTop()`

views/srp.jade
```jade
- listings = ads.rightTop(srpModel.sponsored)

- each listing in listings
    li
        mixin srp-card-featured(listing, className)

```

The ads helper contain a few small functions, each one accepts a simple Hash object.

helpers/srp/ads.js
```js
function centerTop(results) {
    return results.slice(0, 1);
}

function rightTop(results) {
    return results.slice(2, 3);
}

function rightMiddle(results) {
    return results.slice(4, 5);
}

function rightBottom(results) {
    return results.slice(6, 7);
}

module.exports = {
    centerTop: centerTop,
    rightTop: rightTop,
    rightMiddle: rightMiddle,
    rightBottom: rightBottom
};
```

## TLDR

No more complex inheritance, prototype functions and the `this` keyword. Say Hi to small functions that do less stuff.  
And we are making [@substack](http://youtu.be/DCQNm6yiZh0) proud!
