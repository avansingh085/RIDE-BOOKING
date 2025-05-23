import { bookBike,checkAvailability } from "../controllers/bookingController.js";
import express from 'express';
import verifyToken from "../middilewares/auth/verifyToken.js";
const router=express.Router();

router.post("/checkAvailability",verifyToken,checkAvailability);
router.post("/bookBike",verifyToken,bookBike);

export default router;