import { Router } from 'express';
import { CreditWalletController } from '../controllers';
import { ValidateToken } from '../middlewares';

const router = Router();

router.post('/billing/transfer', ValidateToken, CreditWalletController);
// router.get('/billings', getBillingsController);
// router.get('/billings/:walletId', getBillingByWalletController);

export default router;