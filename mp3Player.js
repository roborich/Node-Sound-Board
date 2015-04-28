var fs = require('fs'),
	lame = require('lame'),
	Speaker = require('speaker'),
	get_mp3s = function(){
		console.log("Scanning MP3 folder.");
		fs.readdir('audio/', function(err, files){
			exports.mp3s = [];
			files.forEach(function(file){
				if(file.indexOf(".mp3") > -1 ) {
					exports.mp3s.push(file);
				}
			});
			exports.mp3s_ready = true;
			console.log("MP3s scanned and ready!");
		});

	};

exports.speaker_ready = true;
exports.mp3s_ready = false;
exports.mp3s = [];
exports.play = function(sounds){
	var sound =  'audio/' + sounds + '.mp3';
	var more_sounds = false;
	if(Object.prototype.toString.call( sounds ) === '[object Array]'){
		sound =  'audio/' + sounds[0] + '.mp3';
		if(sounds.length > 1) {
			more_sounds = true;
		}
	}
	if(fs.existsSync(sound) && exports.speaker_ready ) {
		fs.createReadStream(sound)
			.pipe(new lame.Decoder())
			.on('format', function(format) {
				speaker_ready = false;
				this.pipe(new Speaker(format).on('close', function(){
						speaker_ready = true;
						if(more_sounds){
							sounds.shift();
							exports.play(sounds);
						}
					})
				);
			});
	} else {
		console.log(sound + " does not exsist");
	}

};

//scan for mp3s
get_mp3s();

// watch for changes in mp3 folder.
fs.watch('audio/', function(event, filename){
	console.log(event + ' detected in ' + filename);
	get_mp3s();
});