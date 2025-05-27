import Bike from "../models/Bike.js";
import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import User from "../models/User.js";
import asyncError from '../middilewares/errorHand/asyncHandler.js';
import AppError from '../utils/error/AppError.js';

// In-memory temporary store to prevent overlapping concurrent bookings on same bike/time
const store = {};

// Check bike availability
export const checkAvailability = asyncError(async (req, res,next) => {
  const { bikeId, startTime, endTime } = req.body;
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (isNaN(start) || isNaN(end) || end <= start) {
    return next(new AppError('Invalid start or end time', 400));
  }

  const overlappingBooking = await Booking.findOne({
    bikeId,
    $or: [{ pickupTime: { $lt: end }, dropoffTime: { $gt: start } }]
  });

  res.status(200).json({ available: !overlappingBooking });
});

// Book a bike
export const bookBike = asyncError(async (req, res,next) => {
  const { bikeId, startTime, endTime, location } = req.body;
  const userId = req.user.userId;

  // Prevent race conditions: check if there's already a pending booking for the same bike/time
  if (store[bikeId]) {
    const conflict = store[bikeId].some(slot =>
      startTime < slot.dropoffTime && endTime > slot.pickupTime
    );
    if (conflict) {
     return next(new AppError('Temporary conflict — booking in progress. Try again soon.', 429));
    }
  } else {
    store[bikeId] = [];
  }

  // Add a temporary booking lock
  store[bikeId].push({ pickupTime: startTime, dropoffTime: endTime });

  const start = new Date(startTime);
  const end = new Date(endTime);
  if (isNaN(start) || isNaN(end) || end <= start) {
    // Clean up temporary lock
    store[bikeId] = store[bikeId].filter(slot =>
      slot.pickupTime !== startTime || slot.dropoffTime !== endTime
    );
    return next(new AppError('Invalid start or end time', 400));
  }

  const user = await User.findById(userId);
  if (!user) {
    // Clean up temporary lock
    store[bikeId] = store[bikeId].filter(slot =>
      slot.pickupTime !== startTime || slot.dropoffTime !== endTime
    );
    return next(new AppError('Invalid user, please login', 404));
  }

  const bike = await Bike.findById(bikeId);
  if (!bike) {
    // Clean up temporary lock
    store[bikeId] = store[bikeId].filter(slot =>
      slot.pickupTime !== startTime || slot.dropoffTime !== endTime
    );
    return next(new AppError('Bike not found', 404));
  }

  // Check overlapping bookings again before confirming
  const overlappingBooking = await Booking.findOne({
    bikeId,
    $or: [{ pickupTime: { $lt: end }, dropoffTime: { $gt: start } }]
  });

  if (overlappingBooking) {
    // Clean up temporary lock
    store[bikeId] = store[bikeId].filter(slot =>
      slot.pickupTime !== startTime || slot.dropoffTime !== endTime
    );
     return next(new AppError('Bike is not available during this period', 409));
  }

  // Calculate price and duration
  const totalHours = Math.ceil((end - start) / (1000 * 60 * 60));
  const totalPrice = totalHours * bike.pricePerHour;

  // Create payment record
  const newPayment = new Payment({
    date: new Date(),
    amount: totalPrice,
  });
  await newPayment.save();

  // Create booking record
  const newBooking = new Booking({
    bikeId,
    paymentId: newPayment._id.toString(),
    pickupTime: start,
    dropoffTime: end,
    duration: totalHours,
    price: totalPrice,
    location,
  });
  await newBooking.save();

  // Update user's bookings and payments
  user.payments.push(newPayment._id);
  user.bookings.push(newBooking._id);
  await user.save();

  // Remove the temporary booking lock
  store[bikeId] = store[bikeId].filter(slot =>
    slot.pickupTime !== startTime || slot.dropoffTime !== endTime
  );

  res.status(201).json({ message: 'Booking successful', available: true });
});
