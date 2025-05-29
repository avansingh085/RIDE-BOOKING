import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET, EMAIL_USER } from '../config/server-config.js';
import asyncError from '../middilewares/errorHand/asyncHandler.js';
import AppError from '../utils/error/AppError.js';
import transporter from '../config/mailer-config.js';
import otpService from '../services/otpService.js';
import { emailOtpVerificationFormate } from '../services/emailFormate.js';

export const register = asyncError(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError('User already exists', 400);

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword });

  const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '7d' });
  await transporter.sendMail({
    from: `"Drivee" <${EMAIL_USER}>`,
    to: email,
    subject: 'OTP Verification',
    html: emailOtpVerificationFormate()
  });

  res.status(201).json({
    message: 'User registered successfully',
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      avatarUrl: newUser.avatarUrl,
    },
  });
});

export const login = asyncError(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new AppError('Invalid credentials', 400);

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

  return res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
    },
  });
});

export const sendOTP = asyncError(async (req, res, next) => {
  const { email } = req.body;

  const otp = otpService.generateOTP();
  otpService.saveOTP(email, otp);

  try {
    const isExist = await User.find({ email });

    if (isExist?.length) {
      return next(new AppError('User already exists. Please use a different email.', 403));
    }
    await transporter.sendMail({
      from: `"Drivee" <${EMAIL_USER}>`,
      to: email,
      subject: 'OTP Verification',
      html: `<p>Your OTP is <b>${otp}</b></p>`,
    });
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error(err);
    throw new AppError('Failed to send OTP', 500);
  }
});

export const verifyOTP = asyncError((req, res) => {
  const { email, otp } = req.body;
  if (otpService.verifyOTP(email, otp)) {
    otpService.removeOTP(email);
    return res.status(200).json({ message: 'OTP verified successfully.' });
  }
  throw new AppError('Invalid or expired OTP', 400);
});

export const logout = asyncError(async (req, res) => {
  res.status(200).json({ message: 'Logged out successfully (delete token client-side)' });
});

