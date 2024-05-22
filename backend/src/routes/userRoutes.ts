import { Router } from 'express';
import { loginUser } from '../controllers/userController';

const router = Router()

router.get('/login', loginUser);

// router.post('/login', loginUser);

export default router;