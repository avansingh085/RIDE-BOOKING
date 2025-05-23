// controllers/userController.js
import User from '../models/User.js';
import Payment from '../models/Payment.js'
// Get user by ID
export const getUserById = async (req, res) => {
  try {
   
    const user = await User.findById(req.user.userId).select('-password').populate('payments').populate('bookings');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user by ID
export const updateUser = async (req, res) => {
  try {
    
    const { name, phone, location, preferences, avatarUrl } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { name, phone, location, preferences, avatarUrl },
      { new: true, runValidators: true }
    ).select('-password').populate('payments').populate('bookings');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data or server error' });
  }
};

// Delete user by ID
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user.userId);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

