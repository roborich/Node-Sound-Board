import * as express from 'express';
import mp3Controller from './controllers/mp3Controller';
import speechController from './controllers/speechController';

const router = express.Router();

router.get('/');
router.get('/play/:sound', mp3Controller.get);
router.post('/play', mp3Controller.post);
router.post('/say', speechController.say);

export default router;
