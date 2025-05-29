// routes/userRoutes.js
import express from 'express';
import { getUserById, updateUser, deleteUser, getRevenueData, getUserRegistrationChange } from '../controllers/userController.js';
import verifyToken from '../middilewares/auth/verifyToken.js';
import { checkIsAdmin } from '../middilewares/auth/checkIsAdmin.js';
import { verifyAdmin } from '../middilewares/auth/verifyAdmin.js';
const router = express.Router();
router.get('/',verifyToken,checkIsAdmin , getUserById);
router.put('/',verifyToken,checkIsAdmin , updateUser);
router.get('/revenue',verifyToken,verifyAdmin,getRevenueData);
router.get('/newUser',getUserRegistrationChange);
router.delete('/',verifyToken, deleteUser);
export default router;
