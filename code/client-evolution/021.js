// And here is the same code but Using AngularJS

// js file
/*globals confirm, window*/

var deleteNote = require('./delete_note');
var editNote = require('./edit_note');

function NotesController($scope) {
    $scope.edit = function () {
        $scope.editing = true;
    };

    $scope.cancel = function () {
        $scope.editing = false;
    };

    $scope.destroy = function () {
        if (confirm('Are you sure?')) {
            $scope.deleted = true;

            deleteNote($scope.noteID);
        }
    };

    $scope.save = function () {
        $scope.editing = false;

        editNote($scope.noteID, $scope.content);
    };

    $scope.editing = false;
}

module.exports = NotesController;
