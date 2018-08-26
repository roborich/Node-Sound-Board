const fs = require('fs');
const lame = require('lame');
const Speaker = require('speaker');
const get_mp3s = function(){
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
exports.play = soundsIn => {
	const sounds = Array.isArray(soundsIn) ? soundsIn : [soundsIn];
	var sound =  `audio/${sounds[0]}.mp3`;
	var more_sounds = sounds.length > 1;
	
	if(fs.existsSync(sound) && exports.speaker_ready ) {
		try {
		fs.createReadStream(sound)
			.pipe(new lame.Decoder())
			.on('format', function(format) {
				speaker_ready = false;
				console.log('mp3 playing');
				const speaker = new Speaker(format);
				speaker.on('finish', () => console.log('fin'));
				this.pipe(speaker);
			});
		} catch(e){
			console.log('caught it!');
			console.log(e);
		}
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