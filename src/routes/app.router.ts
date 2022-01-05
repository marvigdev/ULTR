import { Router } from 'express';
import { appController } from '../controllers/app.controller';
import { authenticatedOnly } from '../middlewares/authenticatedOnly';
import { renderView } from '../views/renderView';

const router = Router();

router.get('/app', authenticatedOnly, renderView('app'));
router.get("/create", authenticatedOnly, renderView('createLink'))
router.post("/create", authenticatedOnly, appController.createLink);

export default router;
