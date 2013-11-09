// Version 1 - Using a counter

var MybookPresenter = require('yp/presenters/mybook');

function index(req, res) {
  var callbackCounter = 0;
  var dict = {};

  var getCollections = require('yp/services/mybook/collections')(req).all;
  var getNotes = require('yp/services/mybook/notes')(req).all;

  var params = {
    user_id: userID,
    vrid: req.tracking.vrid,
  };

  function respondCollections(err, response) {
    if (err) { return res.send(500); }

    dict.Collections = response.json['Collections'];
  }

  function respondNotes(err, response) {
    if (err) { return res.send(500); }

    dict.Notes = response.json;
  }

  // we need to populate the dict with some data
  // res.template('mybook/index', { mybook: new MybookPresenter(dict) });

  // make some http calls to our API
  getNotes(params, respondNotes);
  getCollections(params, respondCollections);
}
