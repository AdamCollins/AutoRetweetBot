console.log("Bot is starting...");
var Twit = require('twit');
var config = require("./config");
var T = new Twit(config);
var stream = T.stream('user');
var fs = require('fs');
console.log("Bot is ready!");
stream.on("tweet", readTweet);
//console.log("the ID is: " + findTweets("rabits",1));
//retweet('807320112457883649');
//retweet(findTweets("rabits",1));
//stream.on("follow", followed);

//tweet("Test tweet. A random number is: " + Math.ceil(Math.random()*100));








//var tweet = findTweets("rabits playing", 1);
//findAndRetweet("Fun fact: it's, somehow, STILL 2016.");


function findAndRetweet(msg)
{
	//retweet("807397772253134800");
	findTweets(msg,1)
	setTimeout(function(){
		console.log("Found id"+r);
		retweet(r);
	},15000);

	var r = "";
	function findTweets(params, num)
	{

		function callBack(err, data, response) {

			var tweets = data.statuses;

			var json = JSON.stringify(tweets,null,2);
			fs.writeFile("tweet.json",json);

			r += ""+tweets[0].id_str;
			console.log("findtweet call back:"+tweets[0].id);
			for(var i = 0; i<tweets.length; i++)
				console.log(tweets[i].user.name +" tweeted " + tweets[i].text);

		}
		params = {
			q: params, 
			count: num ,
			language: 'en' 
		}
		T.get('search/tweets', params, callBack);

	}

}



function retweet(id)
	{
		var tweetID = {
			id: id
		}
		console.log("trying to retweet :"+id);
		T.post('statuses/retweet/:id', tweetID, callBack);

		function callBack(err, data, response) 
		{
			if(err)
			{
				console.log("Tweet failed to post");
				console.log(err);
			}
			else
				console.log("retweet a tweet.");
		}
	}	











function followed(eventMessage)
{
	var json = JSON.stringify(eventMessage,null,2);
	fs.writeFile("tweet.json",json);
}

function tweet(text)
{
	var tweet = {
		status: text
	}
	T.post('statuses/update', tweet,callBack);

	function callBack(err, data, response) {
		if(err)
			console.log("Tweet failed to post");
		else
			console.log("Tweeted: \""+ text +"\"");
	}
}



function readTweet(eventMessage)
{
	var json = JSON.stringify(eventMessage,null,2);
	fs.writeFile("tweet.json",json);
	var replyto = eventMessage.in_reply_to_screen_name;
	var from = eventMessage.user.screen_name;
	var text = eventMessage.text;
	var id = eventMessage.id;
	console.log("Read tweet id:" + id)
	if(replyto==="pyram66")
	{
		console.log("I was tweeted at!  " +  eventMessage.id);
		setTimeout(function(){
			retweet(eventMessage.id_str);
		},5000);
	}
}