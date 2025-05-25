import mongoose from "mongoose";
const { Schema } = mongoose;

const bookingSchema = new Schema({
  bikeId: {
    type: Schema.Types.ObjectId,
    ref: 'Bike',
    required: true
  },
  paymentId: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now // Automatically sets the current date
  },
  pickupTime: {
    type: Date,
    required: true
  },
  dropoffTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
