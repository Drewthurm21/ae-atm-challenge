import { Router } from 'express';
import { handleDeposit, handleWithdrawal } from '../controllers/transactionController';

const router = Router();


router.get('/deposit', handleDeposit);

router.get('/withdrawal', handleWithdrawal);


export default router;