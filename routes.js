var mp3Player = require('./mp3Player');

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



