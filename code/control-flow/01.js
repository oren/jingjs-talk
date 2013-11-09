// Version 1 - Using a counter

var MybookPresenter = require('yp/presenters/mybook');

function index(req, res) {
  var callbackCounter = 0;
  var dict = {};

  var getCollections = require('yp/services/mybook/collections')(req).all;
  var getNotes = require('yp/services/mybook/notes')(req).all;

  // we need to populate the dict with some data
  // res.template('mybook/index', { mybook: new MybookPresenter(dict) });
}
