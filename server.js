console.log("The Divinator is starting...")
const mongoose = require('mongoose');
var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);
const Tweet = require('./Tweet')

var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
natural.PorterStemmer.attach();

const db = config.mongoURI
mongoose
    .connect(db, {useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Error: ", error));


function tweetIt() {
    var r = Math.floor(Math.random()*100);
    var tweet =  {
        'status': '#' + r + ": Tweeted from a bot for #codechella"
    }
    
    function tweeted(err, data, response) {
        if (err) {
            console.log("Something went wrong!");
        } else {
            console.log("Tweeted!");
        }
    }
    
    T.post('statuses/update', tweet, tweeted);
}

function populateDB() {

    var trackList = ["#climatechange", "#climatechangeisreal", "#actonclimate", "#globalwarming", "#climatechangehoax", 
                 "#climatedeniers", "#climatechangeisfalse", "#globalwarminghoax", "#climatechangenotreal", "climate change", 
                 "global warming", "climate hoax", "extreme weather", "ozone layer", "ice loss", "climate models", "sea levels", 
                 "lightningstrike", "wildfires", "glassfires", "hurricane", "blizzards", "wildfires", "ClimateStrike", "ClimateAction", "water levels",
                "save the earth", "mother earth", "#motherearth", "savemotherearth"];

    function addToDB(data, err) { 
        var tokens = data.text.tokenizeAndStem();
        const newTweet = new Tweet({
            tweet: data.text,
            hashtags: data.entities.hashtags,
            created_at: data.created_at,
            name: data.user.name,
            location: data.user.location,
            verified: data.user.verified,
            tweetTokens: tokens
        });
        newTweet.save()
                .then((data) => console.log("Saved a tweet to DB"));
    }

    var stream = T.stream('statuses/filter', { track : trackList });
    stream.on('tweet', addToDB);
}

// setInterval(tweetIt, 1000*60*1);
populateDB();
processDB();

function processDB() {
    console.log("Hey");
    
}