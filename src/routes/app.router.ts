import { Router } from 'express';
import { appController } from '../controllers/app.controller';
import { authenticatedOnly } from '../middlewares/authenticatedOnly';

const router = Router();

router.get('/app', authenticatedOnly, appController.showLinks);
router.get('/create', authenticatedOnly, appController.renderCreate);
router.post('/create', authenticatedOnly, appController.createLink);
router.all('/delete', authenticatedOnly, appController.deleteLink);

export default router;
