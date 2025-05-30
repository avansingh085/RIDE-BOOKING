import asyncError from '../middilewares/errorHand/asyncHandler.js';
import AppError from '../utils/error/AppError.js';
import Bike from '../models/Bike.js';
import client from '../services/redisServices.js';

// Helper to wrap response with metadata
const createResponse = (req, data) => ({
  args: req.query,
  headers: req.headers,
  url: req.originalUrl,
  data,
});

// Create a new bike
export const createBike = asyncError(async (req, res) => {
  const bike = new Bike(req.body);
  await bike.save();
  await client.del('allBikes'); // Invalidate cache for all bikes
 return res.status(201).json(createResponse(req, bike));
});

// Get all bikes
export const getAllBikes = asyncError(async (req, res) => {
  const cached = await client.get('allBikes');
  if (cached) {
    const bikes = JSON.parse(cached);
    return res.status(200).json(createResponse(req, bikes));
  }

  const bikes = await Bike.find().lean();
  await client.set('allBikes', JSON.stringify(bikes), 'EX', 60); // Cache for 60 seconds

  await Promise.all(
    bikes.map(bike =>
      client.set(`bike:${bike._id}`, JSON.stringify(bike), 'EX', 60)
    )
  );

  res.status(200).json(createResponse(req, bikes));
});

// Get a single bike by ID
export const getBikeById = asyncError(async (req, res, next) => {
  const cachedBike = await client.get(`bike:${req.params.id}`);
  if (cachedBike) {
    return res.status(200).json(createResponse(req, JSON.parse(cachedBike)));
  }

  const bike = await Bike.findById(req.params.id).lean();
  if (!bike) return next(new AppError('Bike not found', 404));

  await client.set(`bike:${req.params.id}`, JSON.stringify(bike), 'EX', 60);
  return res.status(200).json(createResponse(req, bike));
});

// Update a bike
export const updateBike = asyncError(async (req, res, next) => {
  const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bike) return next(new AppError('Bike not found', 404));
  await client.del('allBikes'); // Invalidate cache for all bikes
  await client.set(`bike:${req.params.id}`, JSON.stringify(bike), 'EX', 60);
  res.status(200).json(createResponse(req, bike));
});

// Delete a bike
export const deleteBike = asyncError(async (req, res, next) => {
  const bike = await Bike.findByIdAndDelete(req.params.id);
  if (!bike) return next(new AppError('Bike not found', 404));
   await client.del('allBikes');
  await client.del(`bike:${req.params.id}`);
  res.status(200).json(createResponse(req, { message: 'Bike deleted successfully' }));
});

// Get featured bikes
export const getFeaturedBikes = asyncError(async (req, res) => {
  const bikes = await Bike.find({ featured: true });
  res.status(200).json(createResponse(req, bikes));
});

// Get available bikes
export const getAvailableBikes = asyncError(async (req, res) => {
  const bikes = await Bike.find({ available: true });
  res.status(200).json(createResponse(req, bikes));
});
