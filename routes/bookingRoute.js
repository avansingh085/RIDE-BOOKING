import { bookBike,checkAvailability, getAllBookings } from "../controllers/bookingController.js";
import express from 'express';
import verifyToken from "../middilewares/auth/verifyToken.js";
import { verifyAdmin } from "../middilewares/auth/verifyAdmin.js";
const router=express.Router();

router.post("/checkAvailability",verifyToken,checkAvailability);
router.post("/bookBike",verifyToken,bookBike);
router.get('/allBookings',verifyToken,verifyAdmin,getAllBookings);
export default router;