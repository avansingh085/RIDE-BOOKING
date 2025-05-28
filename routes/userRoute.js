// routes/userRoutes.js
import express from 'express';
import { getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import verifyToken from '../middilewares/auth/verifyToken.js';
import { verifyAdmin } from '../middilewares/auth/verifyAdmin.js';
const router = express.Router();
router.get('/',verifyToken,verifyAdmin, getUserById);
router.put('/',verifyToken,verifyAdmin, updateUser);
router.delete('/',verifyToken, deleteUser);
export default router;
