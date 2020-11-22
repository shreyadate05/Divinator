console.log("The Divinator is starting...")
const mongoose = require('mongoose');
var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);
const Tweet = require('./Tweet')



const db = config.mongoURI
mongoose
    .connect(db, {useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Error: ", error));

function tweetSearch() {

    var searchParams =  { 
        q: 'banana since:2011-07-11', 
        count: 100 
    }
    
    function gotData(err, data, response) {
        var tweets = data.statuses;
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
        }
    }
    
    T.get('search/tweets', searchParams, gotData);
}

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
                 "global warming", "climate hoax", "lightningstrike", "wildfires", "glassfires", "hurricane", "blizzards", "wildfires"];

    function addToDB(data, err) { 
        console.log(data.entities);
        const newTweet = new Tweet({
            tweet: data.text,
            hashtags: data.entities.hashtags,
            created_at: data.created_at,
            name: data.user.name,
            location: data.user.location,
            verified: data.user.verified
        });
        newTweet.save()
                .then((data) => console.log("Saved a tweet to DB"));
    }

    var stream = T.stream('statuses/filter', { track : trackList });
    stream.on('tweet', addToDB);
}

// setInterval(tweetIt, 1000*60*1);
populateDB();