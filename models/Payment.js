// models/Payment.js
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  method: {
    type: String,
    enum: ['UPI', 'Card', 'Cash', 'NetBanking', 'Wallet'],
    default:'Cash'
  },
  status: {
    type: String,
    enum: ['Success', 'Failed', 'Pending'],
    default: 'Pending',
    
  },
  description: {
    type: String,
    maxlength: 500,
    default:"payment for booking"
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
