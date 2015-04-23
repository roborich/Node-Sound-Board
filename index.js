var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');
var jade = require('jade');

app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.get('/', function(req, res){
	fs.readdir('audio/', function(err, files){
		var page_options = {};
		var sound_files = [];
		var soundCheck = function(files){
				console.log(files);
				// files.forEach(function(file){
				// 	if(file.indexOf(".mp3") > -1 || file.indexOf(".wav") > -1 ) {
				// 		sound_files.push(file);
				// 	}
				// });
			};
		soundCheck(files);
		page_options.files = sound_files;
		res.render('boilerplate', page_options);
	});
  //res.sendFile(__dirname + '/index.html');
  //console.log('someone visited home');
});
var speaker_ready = true;
app.get('/audio/:sound', function(req, res){
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
});

app.use(express.static(__dirname + '/public'));

http.listen(80, function(){
  console.log('listening on *:80');
});