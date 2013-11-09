'use strict';
/*jslint node: true */

var jade = require('jade');

var UserPresenter = function (data) {
    this.data = data;
};

UserPresenter.prototype = {
    get name() {
        return this.data.name;
    },

    get title() {
        return this.data.title;
    }
};

var user = new UserPresenter({ name: 'josh', title: 'Sir' });
var html = jade.renderFile('01-classical2.jade', { user: user });

console.log(html);
