const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false);

const tweetData = new Schema({

    name : {
        type : String,
        required : true
    },
    
    geo : {
        type : String,
        required : false
    },
    
    coordinates : {
        type : String,
        required : false
    },
    
    location : {
        type : String,
        required : true
    },

    tweet : {
        type : String,
        required : true
    },

    geo_enabled : {
        type : Boolean,
        required: true
    }
});

module.exports = mongoose.model('tweet', tweetData);