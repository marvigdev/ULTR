import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { unauthenticatedOnly } from '../middlewares/unauthenticatedOnly';
import { renderView } from '../views/renderView';

const router = Router();

router.get('/login', unauthenticatedOnly, renderView('login'));
router.post('/login', unauthenticatedOnly, authController.login);
router.get('/register', unauthenticatedOnly, renderView('register'));
router.post('/register', unauthenticatedOnly, authController.register);

export default router;
