var test = require('tape');

var saveUser = require('./save_user.js');

test('save user', function (t) {
  t.plan(1);  // you have to declare how many assertions are in your test

  saveUser({name: 'joe'}, function(result){
    t.equal(result, 200);  // using the === operator
  });
});

