import express from 'express';
import {
  createBike,
  getAllBikes,
  getBikeById,
  updateBike,
  deleteBike,
  getFeaturedBikes,
  getAvailableBikes
} from '../controllers/bikeController.js';
import verifyToken from '../middilewares/auth/verifyToken.js';
import { verifyAdmin } from '../middilewares/auth/verifyAdmin.js';

const router = express.Router();

router.post('/',verifyToken,verifyAdmin, createBike);
router.get('/', getAllBikes);
router.get('/featured', getFeaturedBikes);
router.get('/available', getAvailableBikes);
router.get('/:id', getBikeById);
router.put('/:id',verifyToken,verifyAdmin, updateBike);
router.delete('/:id',verifyToken,verifyAdmin, deleteBike);

export default router;
