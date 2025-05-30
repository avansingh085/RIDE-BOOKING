import express from 'express'
import { register, login, logout, sendOTP, verifyOTP } from '../controllers/authController.js';
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/send-otp',sendOTP)
router.post('/verify-otp',verifyOTP);

export default router;