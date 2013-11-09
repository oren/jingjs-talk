// And here is the same code but Using AngularJS

// jade file
mixin note(note, opts)
    .note-widget(ng-controller='NotesController', ng-hide='deleted')
        article(ng-hide='editing', ng-init='noteID=#{JSON.stringify(note.id)}')
            header
                - if (!opts.editable)
                    h1
                        = note.businessName
                        span= note.collection
                h2
                    = note.date
                    - if (opts.editable)
                        a.edit-note(href='#', ng-click='edit()') Edit
                        a(href='#', ng-click='destroy()', class='delete-note') Delete

            p.content(ng-bind='content', ng-init='content=#{JSON.stringify(note.content)}')

        form.edit-notes(ng-show='editing', style='display: none')
            .editing
                label
                    textarea(name='edit-note', ng-model='content')

                a.save(href='#', ng-click='save()') Save
                a.cancel(href='#', ng-click='cancel()') Cancel

