// $.post('/article/new/'/*,OBJECTHERE*/).then(function (r){
//     console.log("article added")
// })

function showScrapesIndex() {
    $.get('/').then(function (r) {
        for (var i = 0; i < r.length; i++) {
            $('#scrapeResults').append(
                '<div class="card scrape" "index="' + i + '">\
                 <div class="card-content scrape-content"><h4>'+ (i + 1) + ') ' + r[i].title + '</h4>\
                 <p>'+ r[i].link + '</p><br><a index="'+i+'"class="btn-small btn-saveArticle" href="#">Save Article</a>'
            )
        }
        localStorage.setItem('theScrapesInArray',JSON.stringify(r))
    })
    
}


$(document).ready(function () {
    $(document).on('click', '#btn-scrape', function () {
        $('#scrapeResults').empty()
        showScrapesIndex()
    })

    $(document).on('click', ".btn-saveArticle", function(){
         var articleIndexToAdd = parseInt($(this).attr("index"))
         var Arr = localStorage.getItem('theScrapesInArray') 
         
        console.log("index: "+articleIndexToAdd)
        
        var parsedArray = JSON.parse(Arr)
        // console.log("Title: "+temp[articleIndexToAdd].title)
        // console.log("Link: "+temp[articleIndexToAdd].link)
         
        $.post('/article/new/',parsedArray[articleIndexToAdd]).then(function (r){
            console.log("article added")
        })
    })





})

// showScrapesIndex()



