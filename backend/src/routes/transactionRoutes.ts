import { Router } from 'express';
import { handleDeposit } from '../controllers/transactionController';

const router = Router();


router.get('/deposit', handleDeposit);


export default router;