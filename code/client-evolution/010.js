// Here is the jQuery version

// jade file
mixin note(note, opts)
    article(data-note-id=note.id)
        header
            - if (!opts.editable)
                h1
                    = note.businessName
                    span= note.collection
            h2
                = note.date
                - if (opts.editable)
                    a.edit-note(href="#") Edit
                    a(href="#", class="delete-note") Delete
        p.content
            = note.content

    form.edit-notes
        .editing
            label
                textarea(name='edit-note')
                    = note.content

            a.save(href='#') Save
            a.cancel(href='#') Cancel

