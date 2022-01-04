import { Router } from 'express';
import { unauthenticatedOnly } from '../middlewares/unauthenticatedOnly';

const router = Router();

router.get('/login', unauthenticatedOnly, (req, res) => res.render('login'));

export default router;
