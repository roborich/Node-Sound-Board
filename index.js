var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	jade = require('jade'),
	route = require('./routes'),
	bodyParser = require('body-parser');

// Jade engine stuff
app
	.set('views', __dirname + '/views')
	.set('view engine', "jade")
	.engine('jade', jade.__express)

// Middleware that parses json.
	.use(bodyParser.json())

//Routes
	.get('/', route.home)
	.get('/play/:sound', route.get_play)
	.post('/play', route.post_play)

// Middleware that sends static requests.
	.use(express.static(__dirname + '/public'));

// Initialize Server.
http.listen(80, function(){
  console.log('listening on *:80');
});