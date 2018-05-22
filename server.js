var PORT = process.env.PORT || 3000
var express = require('express')
var bodyparser = require('body-parser')

var cheerio = require('cheerio')
var request = require('request')
var mongoose = require('mongoose')
var path = require('path')
mongoose.connect('mongodb://localhost/scrapeDB')

var app = express()
var db = require('./models')

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

// Static file support with public folder
app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static("public"))

//Routes
require('./routes/routes.js')(app)
require('./routes/html-routes.js')(app)


app.listen(PORT,function(e){
    if (e) throw e
    console.log('LISTENING ON PORT: '+PORT)
})