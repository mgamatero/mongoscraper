var PORT = 3000
var express = require('express')
var bodyparser = require('body-parser')

var cheerio = require('cheerio')
var request = require('request')
var mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/scrapeDB')

var app = express()
var db = require('./models')

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

// Static file support with public folder
app.use(express.static("public"));



request('https://www.quora.com/search?q=javascript',function(e,r,html){
    if (e) throw e

    var $ = cheerio.load(html)
    var resultArr = []

    $('a.question_link').each(function(i,element){
        var title = $(element).text()
        var link = $(element).attr("href")
        resultArr.push(
            {
                title:title,
                link:"https://www.quora.com/"+link,

            }
        )
    })
    console.log(resultArr)
       
})




app.listen(PORT,function(e){
    if (e) throw e
    console.log('LISTENING ON PORT: '+PORT)
})