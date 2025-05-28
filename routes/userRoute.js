// routes/userRoutes.js
import express from 'express';
import { getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import verifyToken from '../middilewares/auth/verifyToken.js';
import { checkIsAdmin } from '../middilewares/auth/checkIsAdmin.js';
const router = express.Router();
router.get('/',verifyToken,checkIsAdmin , getUserById);
router.put('/',verifyToken,checkIsAdmin , updateUser);
router.delete('/',verifyToken, deleteUser);
export default router;
