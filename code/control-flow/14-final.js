// Version 2 - Using a control flow library (async)

// Here is the same code but with the help of the most popular control flow library -
// [async](https://github.com/caolan/async).

var getCollections = require('yp/services/mybook/collections')(req).all;
var getNotes = require('yp/services/mybook/notes')(req).all;

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

// results is now equal to: { collection: <some object>, notes: <some object> }
function onComplete(err, results) {
  if (err) { return res.send(500); }

  var dict = {
    Collections: results.collections.json['Collections'],
    Notes: results.notes.json
  };

  res.template('mybook/index', { mybook: new MybookPresenter(dict) });
}
