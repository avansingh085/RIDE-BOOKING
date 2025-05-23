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

const router = express.Router();

router.post('/', createBike);
router.get('/', getAllBikes);
router.get('/featured', getFeaturedBikes);
router.get('/available', getAvailableBikes);
router.get('/:id', getBikeById);
router.put('/:id', updateBike);
router.delete('/:id', deleteBike);

export default router;
