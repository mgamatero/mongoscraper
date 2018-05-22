

function showScrapesIndex() {
    $.get('/').then(function (r) {
        for (var i = 0; i < r.length; i++) {
            $('#scrapeResults').append(
                '<div class="card scrape" "index="' + i + '">\
                 <div class="card-content scrape-content"><h3>'+ (i + 1) + ') ' + r[i].title + '</h3>\
                 <p>'+ r[i].link + '</p><br><a index="'+i+'"class="btn-small btn-saveArticle" href="#">Save Article</a>'
            )
        }
    })
}

$(document).ready(function () {
    $(document).on('click', '#btn-scrape', function () {
        $('#scrapeResults').empty()
        showScrapesIndex()
    })

    $(document).on('click', ".btn-saveArticle", function(){
        alert($(this).attr("index"))
    })





})

// showScrapesIndex()



