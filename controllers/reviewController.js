import Review from '../models/Review.js';
import asyncError from '../middilewares/errorHand/asyncHandler.js';
import AppError from '../utils/error/AppError.js';

//  Create a new review
export const createReview = asyncError(async (req, res) => {
  const review = new Review(req.body);
  await review.save();
  res.status(201).json(review);
});

//  Get all reviews
export const getAllReviews = asyncError(async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 }); // newest first
  res.status(200).json(reviews);
});

//  Get a single review by ID
export const getReviewById = asyncError(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) throw new AppError('Review not found', 404);
  res.status(200).json(review);
});

//  Update a review
export const updateReview = asyncError(async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!review) throw new AppError('Review not found', 404);
  res.status(200).json(review);
});

// Delete a review
export const deleteReview = asyncError(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) throw new AppError('Review not found', 404);
  res.status(200).json({ message: 'Review deleted successfully' });
});
