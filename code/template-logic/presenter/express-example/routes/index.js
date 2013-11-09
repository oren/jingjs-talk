
/*
 * GET home page.
 */

// exports.index = function(req, res){
//   res.render('index', { title: 'Express' });
// };

var UserPresenter = require('../presenters/user.js');

exports.index = function(req, res){
  // in the real world userData should come from a db or a service
  var userData = { name: 'Josh', title: 'Sir' };

  res.render('index', { user: new UserPresenter(userData) });
};
