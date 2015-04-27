var express = require('express');
var app = express();
var http = require('http').Server(app);
var jade = require('jade');
var route = require('./routes.js');
var	bodyParser = require('body-parser');

// Jade engine stuff
app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', jade.__express);

// Middleware that parses json.
app.use(bodyParser.json());

//Routes
app.get('/', route.home);
app.get('/play/:sound', route.get_play);
app.post('/audio', route.post_play);

// Middleware that sends static requests.
app.use(express.static(__dirname + '/public'));

// Initialize Server.
http.listen(80, function(){
  console.log('listening on *:80');
});