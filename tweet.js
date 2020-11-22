const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false);

const Tweet = new Schema({

    name : {
        type : String,
        required : true
    },

    hashtags: {
        type: Array,
        required: false
    },
    
    location : {
        type : String,
        required : false
    },

    tweet : {
        type : String,
        required : true
    },

    verified : {
        type : Boolean,
        required: true
    },

    created_at : {
        type : Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tweet', Tweet);