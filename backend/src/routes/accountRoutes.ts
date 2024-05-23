import { Router } from 'express'
import { getAccountById, getAccountTransactions } from '../controllers/accountController'

const router = Router()


router.get('/:account_id/transactions', getAccountTransactions);

router.get('/:account_id', getAccountById);


export default router;