// controllers/bikeController.js
import asyncError from '../middilewares/errorHand/asyncHandler.js';
import AppError from '../utils/error/AppError.js';
import Bike from '../models/Bike.js';

//  Create a new bike
export const createBike = asyncError(async (req, res) => {
  const bike = new Bike(req.body);
  await bike.save();
  res.status(201).json(bike);
});

//  Get all bikes
export const getAllBikes = asyncError(async (req, res) => {
  const bikes = await Bike.find();
  res.status(200).json(bikes);
});

//  Get a single bike by ID
export const getBikeById = asyncError(async (req, res) => {
  const bike = await Bike.findById(req.params.id);
  if (!bike) throw new AppError('Bike not found', 404);
  res.status(200).json(bike);
});

//  Update a bike
export const updateBike = asyncError(async (req, res) => {
  const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bike) throw new AppError('Bike not found', 404);
  res.status(200).json(bike);
});

//  Delete a bike
export const deleteBike = asyncError(async (req, res) => {
  const bike = await Bike.findByIdAndDelete(req.params.id);
  if (!bike) throw new AppError('Bike not found', 404);
  res.status(200).json({ message: 'Bike deleted successfully' });
});

//  Get featured bikes
export const getFeaturedBikes = asyncError(async (req, res) => {
  const bikes = await Bike.find({ featured: true });
  res.status(200).json(bikes);
});

// Get available bikes
export const getAvailableBikes = asyncError(async (req, res) => {
  const bikes = await Bike.find({ available: true });
  res.status(200).json(bikes);
});
