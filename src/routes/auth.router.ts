import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { unauthenticatedOnly } from '../middlewares/unauthenticatedOnly';
import { renderView } from '../views/renderView';

const router = Router();

router.use(unauthenticatedOnly);
router.get('/login', renderView('login'));
router.post('/login', authController.login);

router.get('/register', renderView('register'));

export default router;
