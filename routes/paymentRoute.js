import express from 'express';
import { getAllPayments, updatePaymentStatus } from '../controllers/paymentController.js';
import verifyToken from '../middilewares/auth/verifyToken.js';
import { verifyAdmin } from '../middilewares/auth/verifyAdmin.js';

const router = express.Router();

router.get('/',verifyToken,verifyAdmin, getAllPayments);
router.put('/:id/status',verifyToken,verifyAdmin, updatePaymentStatus);

export default router;
