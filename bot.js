console.log("AutoRetweet Bot is starting...");
var Twit = require('twit');			//Imports Twitter API(twit)
var config = require("./config");	//Imports config file with account handle, tokens and keys
var T = new Twit(config);			//Sends keys and token to twitter.
var stream = T.stream('user');
var bothandle = config.bothandle;
var lastTweet = "";
console.log("AutoRetweet Bot is ready!");
console.log("Operating on account: @"+bothandle);

//Reads tweets in Twitter feed
stream.on("tweet", readTweet);

/* -Reads tweet
 * -Logs in console tweet contents
 * -Retweets if @bothandle is int tweet.
 * -@param tweet JSON object.
**/
function readTweet(eventMessage)
{	
	var replyto = eventMessage.in_reply_to_screen_name;
	var from = eventMessage.user.screen_name;
	var text = eventMessage.text;
	var id = eventMessage.id;
	mentions = eventMessage.entities.user_mentions;
	console.log("Read tweet from @"+from+"("+id+"): "+text);
	if(mentioned(mentions))
	{
		console.log("I was tweeted at!  " +  eventMessage.id);
		setTimeout(function(){
			retweet(eventMessage.id_str);
		},5000);
	}
}


/* Retweets tweet
 * @param id_str of tweet
 */
function retweet(id)
	{
		var tweetID = {
			id: id
		}
		T.post('statuses/retweet/:id', tweetID, callBack);

		function callBack(err, data, response) 
		{

			if(err && !(err+"").includes("You have already retweeted this tweet."))
			{
				console.log("Tweet failed to post");
				console.log(err);
			}
			else
				console.log("retweet a tweet.");
		}
	}	

/* @return true if screen_name in list matches bothandle
 * @params JSON object list of mentions from tweet object
 */
function mentioned(mentions)
{
	for(var i = 0; i <mentions.length; i++)
	{
		if(mentions[i].screen_name===bothandle)
			return true;
	}
	return false;
}