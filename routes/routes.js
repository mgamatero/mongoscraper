// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
var scrape = require("../models")
var request = require('request')
var cheerio = require('cheerio')


// Routes
// =============================================================
module.exports = function (app) {

    //Used to hold scrapes
    var resultArr = []

    // ----------------------------------------------------
    // Gets scrapes from quora and pushes results into resultArr[]
    //-------------------------------------------------------
    app.get('/scrapes', function (req, res) {
        resultArr = []
        request('https://www.quora.com/search?q=javascript', function (e, r, html) {
            if (e) throw e
            var $ = cheerio.load(html)

            $('a.question_link').each(function (i, element) {
                var title = $(element).text()
                var link = $(element).attr("href")

                resultArr.push(
                    {
                        title: title,
                        link: "https://www.quora.com/" + link,
                    }
                )
            })
            console.log(resultArr)
            res.json(resultArr)
        })
    });



    //---------------------------------------------------------------------------
    //Gets saved scrapes from scrapesDB
    //----------------------------------------------------------------------------
    app.get('/savedScrapes', function (req, res) {
        db.scrape.find({}).then(function (r) {
            res.json(r)
            console.log(r)
        }).catch(function (e) {
            res.send(e)
            console.log(e)
        })
    });



    //---------------------------------------------------------------------
    //Posts saved article
    //------------------------------------------------------------------------
    app.post('/article/new/', function (req, res) {
        db.scrape.create({
            title: req.body.title,
            link: req.body.link,
            notes: "none"
        }).then(function (r) {
            res.send(r)
        }).catch(function (e) {
            res.send(e)
        })
    })



    //-------------------------------------------------------------------------
    //THIS IS MEANT TO BE A DELETE!!!!!!!!!!!!!!!!!!!!!!!!
    //-------------------------------------------------------------------------
    app.post('/savedScrapes/:id', function (req, res) {
        db.scrape.remove({
            _id: req.params.id
        }).then(function (r) {
            res.json(r)
            console.log(r)
        }).catch(function (e) {
            res.send(e)
            console.log(e)
        })
        // --same thing, keeping for reference  ----
        // db.scrape.findByIdAndRemove({_id:req.params.id}).then(function(r){
        //     res.send(r)
        // })
    })


    //--------------------------------------------------------------------
    //THIS IS MEANT TO BE A PUT!!!!!!!!!!!!!!!!!!!!!!!!
    //--------------------------------------------------------------------
    app.post('/savedScrapes/addNote/:id/:note', function (req, res) {
        db.scrape.update({ _id: req.params.id },
            { $set: { notes: req.params.note } }).then(function (r) {
                res.send(r)
            }).catch(function (e) {
                res.send(e)
            })
    })
}
