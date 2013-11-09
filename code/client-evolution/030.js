// And the Ractive.js version

// mustache.js file
<section class="notes">
    <form action="post">

        {{^adding}}
        <label class="default">
            <input type="text" placeholder="Add a note..." proxy-click="add">
        </label>
        {{/adding}}

        {{#adding}}
            <div class="adding">
                <label>
                    <textarea name="content" value="{{ note.content }}" autofocus></textarea>
                </label>

                <button class="save" type="submit">Save</button>

                <a class="cancel" href="#cancelAdd" proxy-click="cancelAdd">Cancel</a>
            </div>
        {{/adding}}

    </form>
</section>
