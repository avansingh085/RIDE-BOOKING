// app.js
import express from 'express';
import cors from 'cors';

import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import bikeRoute from './routes/bikeRoute.js';
import reviewRoute from './routes/reviewRoute.js';
import bookingRoute from './routes/bookingRoute.js';
const app = express();

// Middleware: apply CORS before routes
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// API routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/bike', bikeRoute);
app.use('/api/review', reviewRoute);
app.use('/api/booking',bookingRoute);

export default app;
