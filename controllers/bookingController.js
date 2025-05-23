import Bike from "../models/Bike.js";
import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import User from "../models/User.js";
export const checkAvailability = async (req, res) => {
  try {
   
    const { bikeId, startTime, endTime } = req.body;

    const start = new Date(startTime);
    const end = new Date(endTime);
   
    if (isNaN(start) || isNaN(end) || end <= start) {
      return res.status(400).json({ message: 'Invalid start or end time' });
    }

    const overlappingBooking = await Booking.findOne({
      bikeId,
      $or: [
        { pickupTime: { $lt: end }, dropoffTime: { $gt: start } }
      ]
    });

    const available = !overlappingBooking;
    console.log(available)
    res.json({ available });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

export const bookBike = async (req, res) => {
  try {
    const { bikeId, startTime, endTime ,location} = req.body;
   const userId=req.user.userId;

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start) || isNaN(end) || end <= start) {
      return res.status(400).json({ message: 'Invalid start or end time' });
    }
     const user=await User.findById(userId);
     if(!user)
     {
      return res.status(404).send({message:"invalid user please login"});
     }
    const bike = await Bike.findById(bikeId);
    if (!bike) {
      return res.status(404).json({ message: 'Bike not found' });
    }

    const overlappingBooking = await Booking.findOne({
      bikeId,
      $or: [
        { startTime: { $lt: end }, endTime: { $gt: start } }
      ]
    });

    if (overlappingBooking) {
      return res.status(409).json({ message: 'Bike is not available during this period' });
    }

    const totalHours = Math.ceil((end - start) / (1000 * 60 * 60));
    const totalPrice = totalHours * bike.pricePerHour;
     const newPayment=new Payment({
      date:new Date(),
      amount:totalPrice,
    });
    await newPayment.save();
   const newBooking = new Booking({
  bikeId,
  paymentId: newPayment._id.toString(),
  pickupTime: start,
  dropoffTime: end,
  duration: `${totalHours} hours`,
  price: `₹${totalPrice}`,
  location
});

    
    await newBooking.save();
     user.payments.push(newPayment._id);
     user.bookings.push(newBooking._id);
     await user.save();
    console.log(user)
    res.status(201).json({ message: 'Booking successful', available:true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
