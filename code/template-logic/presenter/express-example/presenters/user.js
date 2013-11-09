'use strict';

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
