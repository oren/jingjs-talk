// And the Ractive.js version

// js file

var editNote = require('./edit_note');
var deleteNote = require('./delete_note');

var Notes = Ractive.extend({
    template: fs.readFileSync(__dirname + '/../../templates/notes.html'),

    setNote: function (idx, attr, value) {
        var key = format('notes.%s.%s', idx, attr);

        return this.set(key, value);
    },

    getNote: function (idx, attr) {
        var key = format('notes.%s.%s', idx, attr);

        return this.get(key);
    },

    init: function () {
        this.set('enableShowMore', this.get('notes').length > 1);

        this.on({
            'add': function () {
                this.set('adding', true);
            },

            'cancelAdd': function (event) {
                preventDefault(event);

                this.set({
                    'note.content': '',
                    'adding': false
                });
            },

            'toggleEdit': function (event, idx) {
                preventDefault(event);

                this.setNote(idx, 'editing', !this.getNote(idx, 'editing'));
            },

            'delete': function (event, idx) {
                var self = this;

                preventDefault(event);

                if (confirm('Are you sure?')) {
                    deleteNote(self.getNote(idx, 'note.ts')).then(function () {
                        self.sliceNote(idx);
                    });
                }
            }
        });
    }
});

module.exports = Notes;
