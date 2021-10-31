import { Router } from 'express';
//Controllers
import { sendEmailController, fetchEmailController } from '../controllers';

const router = Router();

// @desc To activate a user
router.post("/email", sendEmailController);
router.get('/emails', fetchEmailController);

export default router;
