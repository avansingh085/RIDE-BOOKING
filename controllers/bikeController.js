import Bike from '../models/Bike.js';

// Create a new bike
export const createBike = async (req, res) => {
  try {
    const bike = new Bike(req.body);
    await bike.save();
    res.status(201).json(bike);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all bikes
export const getAllBikes = async (req, res) => {
   
  try {
    const bikes = await Bike.find();
    res.status(200).json(bikes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single bike by ID
export const getBikeById = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ error: 'Bike not found' });
    res.status(200).json(bike);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a bike
export const updateBike = async (req, res) => {
  try {
    const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!bike) return res.status(404).json({ error: 'Bike not found' });
    res.status(200).json(bike);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a bike
export const deleteBike = async (req, res) => {
  try {
    const bike = await Bike.findByIdAndDelete(req.params.id);
    if (!bike) return res.status(404).json({ error: 'Bike not found' });
    res.status(200).json({ message: 'Bike deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get featured bikes
export const getFeaturedBikes = async (req, res) => {
  try {
    const bikes = await Bike.find({ featured: true });
    res.status(200).json(bikes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get available bikes
export const getAvailableBikes = async (req, res) => {
  try {
    const bikes = await Bike.find({ available: true });
    res.status(200).json(bikes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
