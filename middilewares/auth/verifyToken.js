import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/server-config.js';
import asyncError from '../errorHand/asyncHandler.js';
import AppError from '../../utils/error/AppError.js';

const verifyToken = asyncError(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError('Access Denied: No or malformed token provided', 401));
  }
  const token = authHeader.trim();
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    return next(new AppError('Invalid or expired token', 401));
  }
});

export default verifyToken;
