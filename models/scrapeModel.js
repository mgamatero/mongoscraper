var mongoose = require('mongoose')
var Schema = mongoose.Schema

var scrape = new Schema({
    title:
        {
            type: String,
            required: true
        },
    link:
        {
            type: String,
            required: true
        }
})

module.exports = mongoose.model('scrape',scrape)