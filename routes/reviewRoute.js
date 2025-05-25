import express from 'express';
import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getRandomReviews
} from '../controllers/reviewController.js';
import verifyToken from '../middilewares/auth/verifyToken.js';

const router = express.Router();
router.get('/random/:size',getRandomReviews);
router.post('/',verifyToken, createReview);
router.get('/',verifyToken, getAllReviews);
router.get('/:id',verifyToken, getReviewById);
router.put('/:id',verifyToken, updateReview);
router.delete('/:id',verifyToken, deleteReview);

export default router;
