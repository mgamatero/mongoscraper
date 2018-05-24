//-------------------------------------------------
//Function to show the scrapes dynamically.  It's not reading from the DB.  Its from
//the resultArr[] in routes.js.  This is the reason I had to use localStorage
//---------------------------------------------------
function showScrapesIndex() {
    $.get('/scrapes').then(function (r) {
        for (var i = 0; i < r.length; i++) {
            $('#scrapeResults').append(
                '<div class="card scrape" "index="' + i + '">\
                 <div class="card-content scrape-content"><h4>'+ (i + 1) + ') ' + r[i].title + '</h4>\
                 <p>'+ r[i].link + '</p><br><a index="' + i + '"class="btn-small btn-saveArticle" href="#">Save Article</a>'
            )
        }
        localStorage.setItem('theScrapesInArray', JSON.stringify(r))
    })
}
//--------------------------------------------------------------------



$(document).ready(function () {

    //Shows the scrapes once Scrape Button clicked
    $(document).on('click', '#btn-scrape', function () {
        $('#scrapeResults').empty()
        showScrapesIndex()
    })

    //Saves article to database once Save Button clicked.  Saves article to scrapeDB.scrapes
    $(document).on('click', ".btn-saveArticle", function () {
        var articleIndexToAdd = parseInt($(this).attr("index"))
        var Arr = localStorage.getItem('theScrapesInArray')

        var parsedArray = JSON.parse(Arr)

        //uses Array from localstorage, stores to scrapeDB.scrapes
        $.post('/article/new/', parsedArray[articleIndexToAdd]).then(function (r) {
            console.log("article added")
        })
    })





})

// showScrapesIndex()



