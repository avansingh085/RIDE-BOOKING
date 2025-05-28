// routes/userRoutes.js
import express from 'express';
import { getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import verifyToken from '../middilewares/auth/verifyToken.js';
import { verifyAdmin } from '../middilewares/auth/verifyAdmin.js';
const router = express.Router();
router.get('/',verifyToken, getUserById);
router.put('/',verifyToken, updateUser);
router.delete('/',verifyToken, deleteUser);
export default router;
