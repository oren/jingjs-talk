// Here is the jQuery version

// jquery file that take cares of the interactions of this section

/*globals $*/

var deleteNote = require('./mybook/deleteNote');
var editNote = require('./mybook/editNote');

function setup() {
    $('.add-note').on('click', 'label.default', function (e) {
        var $this = $(e.currentTarget);
        var $pair = $this.next('.adding');

        $this.toggle();
        $pair.toggle();
    });

    $('.add-note').on('click', 'a.cancel', function (e) {
        var $this = $(e.currentTarget).parents('.adding');
        var $pair = $this.prev('label.default');

        $this.toggle();
        $pair.toggle();
    });

    $('.add-note').on('click', '.save', function (e) {
        var $form = $(e.delegateTarget);

        $form.trigger('submit');

        return false;
    });

    $('.notes').on('click', '.edit-note', function (e) {
        var $this = $(e.currentTarget);
        var $readOnly = $this.parents('article:first');
        var $edit = $this.parents('.notes').find('.edit-notes');

        $readOnly.toggle();
        $edit.toggle();
    });

    $('.edit-notes').on('click', '.cancel-note', function (e) {
        var $this = $(e.currentTarget);
        var $readOnly = $this.parents('.edit-notes').prev();
        var $edit = $this.parents('.edit-notes');

        $readOnly.toggle();
        $edit.toggle();
    });

    $('.edit-notes').on('click', '.save-note', function (e) {
        var $this = $(e.currentTarget);
        var $note = $(e.currentTarget).parents('[data-note-id]');
        var noteId = $note.data('note-id');
        var content = $this.parent().find('[name=edit-note]').val();

        function onSuccess(err, res) {
            if (err) { return console.error(err); }

            void(res);
        }

        editNote(noteId, content, onSuccess);
        return false;
    });

    $('.notes').on('click', '.delete-note', function (e) {
        var $note = $(e.currentTarget).parents('[data-note-id]');
        var noteId = $note.data('note-id');

        function onSuccess(err, res) {
            if (err) { return console.error(err); }

            void(res);
            $note.remove();
        }

        deleteNote(noteId, onSuccess);
    });
}

$(setup);
