// models/Review.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    maxlength: 1000
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '', // Optional: default placeholder
  }
}, {
  timestamps: true // adds createdAt and updatedAt fields
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
