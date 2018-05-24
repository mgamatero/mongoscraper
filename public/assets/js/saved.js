
function showSavedScrapes() {
    $.get('/savedScrapes').then(function (r) {
        $('#savedScrapeResults').empty()
        for (var i = 0; i < r.length; i++) {
            $('#savedScrapeResults').append(
                '<div class="card scrapedResults" "index="' + i + '">\
                 <div class="card-content scrapedResults-content"><h4>'+ (i + 1) + ') ' + r[i].title + '</h4>\
                 <p>'+ r[i].link + '</p><br><a id="' + r[i]._id + '"class="btn-small btn-small-scraped-view" href="' + r[i].link + '" target="_blank">View Article</a>\
                 <a id="' + r[i]._id + '"class="btn-small btn-small-scraped-delete" href="#">Delete Article</a>\
                 <a id="' + r[i]._id + '"class="btn-small btn-small-scraped-addnote" href="#">Add/Edit Note</a>'
            )
        }
    })
}


$(document).ready(function () {
    showSavedScrapes()

    //This handles a DELETE.  However, i can't get $.delete to work.  I get an error this
    //function is not valid.  I used POST, and it works fine. 
    $(document).on('click', '.btn-small-scraped-delete', function () {
        var idToDelete = $(this).attr('id')
        //----Why is this post?  it doesn't work with $.delete?
        $.post('/savedScrapes/' + idToDelete).then(function (r) {
            alert('Article deleted!')
        })
        showSavedScrapes()
    })



});











