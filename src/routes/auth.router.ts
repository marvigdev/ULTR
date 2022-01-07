import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authenticatedOnly } from '../middlewares/authenticatedOnly';
import { unauthenticatedOnly } from '../middlewares/unauthenticatedOnly';

const router = Router();

router.get('/login', unauthenticatedOnly, authController.renderLogin);
router.post('/login', unauthenticatedOnly, authController.login);

router.get('/register', unauthenticatedOnly, authController.renderRegister);
router.post('/register', unauthenticatedOnly, authController.register);

router.get('/logout', authenticatedOnly, authController.logout);

export default router;
