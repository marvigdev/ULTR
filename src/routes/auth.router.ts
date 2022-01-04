import { Router } from 'express';
import { unauthenticatedOnly } from '../middlewares/unauthenticatedOnly';

const router = Router();

router.use(unauthenticatedOnly);
router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

export default router;
