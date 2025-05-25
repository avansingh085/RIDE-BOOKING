// app.js
import express from 'express';
import cors from 'cors';
import errorHandler from './middilewares/errorHand/errorHandler.js';

import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import bikeRoute from './routes/bikeRoute.js';
import reviewRoute from './routes/reviewRoute.js';
import bookingRoute from './routes/bookingRoute.js';
import contactRoute from './routes/contactRoute.js'
const app = express();

// Middleware: apply CORS before routes
app.use(cors({ origin: '*', credentials: true }));

// JSON parser
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/bike', bikeRoute);
app.use('/api/review', reviewRoute);
app.use('/api/booking', bookingRoute);
app.use('/api/contact',contactRoute)



//  Global Error Handler
app.use(errorHandler);

export default app;
