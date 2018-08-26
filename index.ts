import * as express from 'express';
import * as jade from 'jade';
import route from './routes';
import * as bodyParser from 'body-parser';

const app = express();
// Jade engine stuff
app
  .set('views', __dirname + '/views')
  .set('view engine', "jade")
  .engine('jade', jade.__express)

  .use(bodyParser.json())

  .get('/', route.home)
  .get('/play/:sound', route.get_play)
  .post('/play', route.post_play)
  .post('/say', route.post_say)


  .use(express.static(__dirname + '/public'));

// Initialize Server.
app.listen(8080, function () {
  console.log('listening on :8080');
});
