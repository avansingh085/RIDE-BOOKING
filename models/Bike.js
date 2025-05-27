// models/Bike.js
import mongoose from 'mongoose';

const bikeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },

  model:{
    type:String,
    required:true,
  },
  type: {
    type: String,
    // enum: ['Sport', 'Cruiser', 'Touring', 'Electric', 'Standard', 'Off-Road'],
    required: true,
  },
  seats: {
    type: Number,
    min: 1,
    required: true,
  },
  horsepower: {
    type: Number,
    required: true,
  },
  fuel: {
    type: String,
    // enum: ['Petrol', 'Electric', 'Diesel', 'Hybrid'],
    required: true,
  },
  engine: {
    type: String,
    required: true,
  },
  brakes: {
    type: String,
    // enum: ['Disc', 'Drum', 'ABS'],
    default: 'Disc',
  },
  stroke: {
    type: String,
    required: true,
  },
  gearbox: {
    type: String,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
    min: 0,
  },
  duration:{
    type:String,
    default:""
  },
  brand:{
    type:String,
    default:""
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: {
    type: Number,
    default: 0,
    min: 0,
  },
  image: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  available: {
    type: Boolean,
    default: true,
  },
  view: [{
    type: String, // image URLs
  }],
  specifications: [{
    key: { type: String },
    value: { type: String }
  }],
  about: {
    type: String,
    default: '',
  },
  features: [{
    type: String
  }]
}, {
  timestamps: true
});

const Bike = mongoose.model('Bike', bikeSchema);

export default Bike;
