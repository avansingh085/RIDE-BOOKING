import User from '../models/User.js';
import asyncError from '../middilewares/errorHand/asyncHandler.js';
import AppError from '../utils/error/AppError.js';

//  Get user by ID
export const getUserById = asyncError(async (req, res) => {
  const user = await User.findById(req.user.userId)
    .select('-password')
    .populate('payments')
    .populate('bookings');

  if (!user) throw new AppError('User not found', 404);

  res.status(200).json(user);
});

//  Update user by ID
export const updateUser = asyncError(async (req, res) => {
  const { name, phone, location, preferences, avatarUrl } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user.userId,
    { name, phone, location, preferences, avatarUrl },
    { new: true, runValidators: true }
  )
    .select('-password')
    .populate('payments')
    .populate('bookings');

  if (!updatedUser) throw new AppError('User not found', 404);

  res.status(200).json(updatedUser);
});

//  Delete user by ID
export const deleteUser = asyncError(async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.user.userId);
  if (!deletedUser) throw new AppError('User not found', 404);

  res.status(200).json({ message: 'User deleted successfully' });
});
