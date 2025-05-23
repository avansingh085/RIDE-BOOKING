import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/server-config.js';
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }
  const token = authHeader;
  

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
   
    next();
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default verifyToken;
