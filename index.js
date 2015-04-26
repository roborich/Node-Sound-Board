var express = require('express');
var app = express();
var http = require('http').Server(app);
var jade = require('jade');
var route = require('./routes.js');
var	bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.use(bodyParser.json());
app.engine('jade', jade.__express);

app.get('/', route.home);
app.get('/play/:sound', route.get_play);
app.post('/audio', route.post_play);
app.use(express.static(__dirname + '/public'));

http.listen(80, function(){
  console.log('listening on *:80');
});