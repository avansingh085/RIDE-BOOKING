import User from '../models/User.js';
import asyncError from '../middilewares/errorHand/asyncHandler.js';
import AppError from '../utils/error/AppError.js';
import Payment from '../models/Payment.js';

//  Get user by ID
export const getUserById = asyncError(async (req, res) => {
  const user = await User.findById(req.user.userId)
    .select('-password')
    .populate('payments')
    .populate('bookings').lean();

  if (!user) throw new AppError('User not found', 404);
 const isAdmin=req?.isAdmin;
  res.status(200).json({...user,isAdmin});
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
    .populate('bookings').lean();

  if (!updatedUser) throw new AppError('User not found', 404);
  const isAdmin=req?.isAdmin;
  res.status(200).json({...updatedUser,isAdmin});
});

//  Delete user by ID
export const deleteUser = asyncError(async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.user.userId);
  if (!deletedUser) throw new AppError('User not found', 404);

  res.status(200).json({ message: 'User deleted successfully' });
});

export const getUserRegistrationChange = async (req,res) => {
  try {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);
    const startOfDayBeforeYesterday = new Date(startOfYesterday);
    startOfDayBeforeYesterday.setDate(startOfDayBeforeYesterday.getDate() - 1);

    // Count users registered yesterday
    const yesterdayCount = await User.countDocuments({
      joinedDate: { $gte: startOfYesterday, $lt: startOfToday },
    });

    // Count users registered day before yesterday
    const dayBeforeCount = await User.countDocuments({
      joinedDate: { $gte: startOfDayBeforeYesterday, $lt: startOfYesterday },
    });

    let percentageChange = 0;
    if (dayBeforeCount === 0) {
      percentageChange = yesterdayCount > 0 ? 100 : 0;
    } else {
      percentageChange = ((yesterdayCount - dayBeforeCount) / dayBeforeCount) * 100;
    }

    return res.json({
      yesterdayCount,
      dayBeforeCount,
      percentageChange: percentageChange.toFixed(2),
    });
  } catch (error) {
    console.error('Error calculating user registration change:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRevenueData = async (req, res) => {
  try {
    const revenueData = await Payment.aggregate([
      {
        $match: { status: 'Success' },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" }, // group by date string
          },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: { _id: 1 }, 
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          value: "$totalAmount"
        },
      },
    ]);

    res.json(revenueData);
  } catch (err) {
    console.error("Error generating revenue data:", err);
    res.status(500).json({ error: 'Failed to fetch revenue data' });
  }
};
