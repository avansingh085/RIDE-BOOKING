// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Invalid email address'],
  },
  phone: {
    type: String,
    default:0,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // or stronger
    select: false // prevent returning in queries by default
  },
  avatarUrl: {
    type: String,
    default: '',
  },
  joinedDate: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
    default: '',
  },
  payments: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Payment'
}],
 bookings:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Booking'
 }],
  preferences: {
    receiveEmails: {
      type: Boolean,
      default: true,
    },
    preferredBikeType: {
      type: String,
      default: 'Standard',
    },
     darkMode: {
      type: Boolean,
      default: false,
    },
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
