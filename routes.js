var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');
var speaker_ready = true;


var play = function(sounds){

		console.log('play called: passed :' + sounds);
		var sound = 'audio/' + sounds[0] + '.mp3';
		console.log('attempting to play ' + sound);
		if(fs.existsSync(sound) && speaker_ready ) {

			var this_decoder = new lame.Decoder();
			fs.createReadStream(sound)
				.pipe(this_decoder)
				.on('format', function(format) {

					console.log(sound + " has been decoded");

					/// there is a hangup here on the second time around.
					speaker_ready = false;
					var this_speaker = new Speaker(format);
					this.pipe(this_speaker.on('close', function(){
							speaker_ready = true;
							console.log("most likely just played " + sound);

							sounds.shift();
							console.log("sending " + sounds + " back to play()");
							play(sounds);
						})
					);
				});
		} else {
			console.log(sound + " does not exsist");
		}

};



exports.post_play = function(req, res){
	//res.send('playing sounds');

	var clips = req.body.clips;
	//res.end();

		play(clips);


	//res.send('playing sounds');
};


exports.home = function(req, res){
	fs.readdir('audio/', function(err, files){
		var page_options = {};
		var sound_files = [];
		var soundCheck = function(files){
				files.forEach(function(file){
					if(file.indexOf(".mp3") > -1 || file.indexOf(".wav") > -1 ) {
						sound_files.push(file);
					}
				});
			};
		if(files) {
			soundCheck(files);
			page_options.files = sound_files;
			res.render('boilerplate', page_options);
		} else {
			console.log("No MP3s found.");
			res.send("No MP3s found.");
		}
	});
};

exports.get_play = function(req, res){
	var sound = 'audio/' + req.params.sound + '.mp3';

	if (fs.existsSync(sound) && speaker_ready) {
		res.send('playing ' + sound);
		console.log('playing ' + sound);
		fs.createReadStream(sound)
			.pipe(new lame.Decoder())
			.on('format', function (format) {
				speaker_ready = false;
				this.pipe(new Speaker(format).on('close', function(){
					speaker_ready = true;
				}));
			});

	} else {
		res.send(sound + ' does not exist or speaker is busy. :(');
		console.log(sound + ' does not exist or speaker is busy. :(');
	}
};



