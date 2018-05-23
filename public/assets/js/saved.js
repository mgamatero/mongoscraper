// $.post('/article/new/'/*,OBJECTHERE*/).then(function (r){
//     console.log("article added")
// })

function showSavedScrapes() {
    $.get('/savedScrapes').then(function (r) {
        for (var i = 0; i < r.length; i++) {
            $('#savedScrapeResults').append(
                '<div class="card scrapedResults" "index="' + i + '">\
                 <div class="card-content scrapedResults-content"><h4>'+ (i + 1) + ') ' + r[i].title + '</h4>\
                 <p>'+ r[i].link + '</p><br><a index="' + i + '"class="btn-small btn-small-scraped-view" href="#">View Article</a>\
                 <a index="' + i + '"class="btn-small btn-small-scraped-delete" href="#">Delete Article</a>\
                 <a index="' + i + '"class="btn-small btn-small-scraped-addnote" href="#">Add/Edit Note</a>'
            )
        }
        // localStorage.setItem('theScrapesInArray',JSON.stringify(r))
    })
}


$(document).ready(function () {
    showSavedScrapes()
    //     $(document).on('click', '#btn-scrape', function () {
    //         $('#scrapeResults').empty()
    //         showScrapesIndex()
    //     })

    //     $(document).on('click', ".btn-saveArticle", function(){
    //          var articleIndexToAdd = parseInt($(this).attr("index"))
    //          var Arr = localStorage.getItem('theScrapesInArray') 

    //         console.log("index: "+articleIndexToAdd)

    //         var parsedArray = JSON.parse(Arr)
    //         // console.log("Title: "+temp[articleIndexToAdd].title)
    //         // console.log("Link: "+temp[articleIndexToAdd].link)

    //         $.post('/article/new/',parsedArray[articleIndexToAdd]).then(function (r){
    //             console.log("article added")
    //         })
});











