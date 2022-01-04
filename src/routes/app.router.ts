import { Router } from 'express';
import { authenticatedOnly } from '../middlewares/authenticatedOnly';
import { renderView } from '../views/renderView';

const router = Router();

router.get('/app', authenticatedOnly, renderView('app'));

export default router;
