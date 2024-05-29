import { Router } from 'express';
import { handleDeposit, handleWithdrawal } from '../controllers/transactionController';

const router = Router();


router.post('/deposit', handleDeposit);

router.post('/withdrawal', handleWithdrawal);


export default router;