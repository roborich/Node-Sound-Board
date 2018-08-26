import * as express from 'express';
import {json} from 'body-parser';
import routes from './routes';

const app = express();
app.use(json());
app.set('views', './views');
app.set('view engine', 'pug');
app.use(routes);
app.use(express.static('./public'));

