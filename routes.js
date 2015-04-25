var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');
var speaker_ready = true;

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

exports.play = function(req, res){
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
		console.log(sound + ' does not exist or speaker is busy. :(');
		res.send(sound + ' does not exist or speaker is busy. :(');
	}
};