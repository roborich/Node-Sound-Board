var mp3Player = require('./mp3Player');
var say = require('say');
var util = require('util');

exports.home = function(req, res){
	var page_options = {
		files : mp3Player.mp3s
	};
	res.render('boilerplate', page_options);
};

exports.post_play = function(req, res){
	res.send("playing " + req.body);
	mp3Player.play(req.body);
};


exports.get_play = function(req, res){
	res.send("playing " + req.params.sound);
	mp3Player.play(req.params.sound);
};

exports.post_say = function(req, res){
	res.send("saying " + req.body);
	console.log(req);
	say.speak("", req.body.say);
};

