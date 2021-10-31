import { Router } from 'express';
import { fetchTransactions, getBankList, verifyPaymentController } from '../controllers';
import { ValidateToken } from '../middlewares';

const router = Router();

router.get('/banks', getBankList);
router.get('/transactions', fetchTransactions);
router.post('/verify', ValidateToken, verifyPaymentController);

export default router;