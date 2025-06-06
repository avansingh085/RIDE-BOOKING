// app.js
import express from 'express';
import cors from 'cors';
import errorHandler from './middilewares/errorHand/errorHandler.js';
import { FRONTEND_URL } from './config/server-config.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import bikeRoute from './routes/bikeRoute.js';
import reviewRoute from './routes/reviewRoute.js';
import bookingRoute from './routes/bookingRoute.js';
import contactRoute from './routes/contactRoute.js'
import uploadRoute from './routes/uploadRoute.js';
import AppError from './utils/error/AppError.js';
import paymentRoute from './routes/paymentRoute.js';

const app = express();

// Middleware: apply CORS before routes
app.use(cors({ origin: FRONTEND_URL, credentials: true }));


//  Global Error Handler
app.use(errorHandler);

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/bike', bikeRoute);
app.use('/api/review', reviewRoute);
app.use('/api/booking', bookingRoute);
app.use('/api/contact',contactRoute);
app.use('/api/upload',uploadRoute)
app.use('/api/payments',paymentRoute)



export default app;
