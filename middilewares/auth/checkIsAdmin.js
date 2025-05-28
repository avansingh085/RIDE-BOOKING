import { ADMIN_EMAIL } from "../../config/server-config.js";
import User from "../../models/User.js";
import AppError from "../../utils/error/AppError.js";
import asyncError from "../errorHand/asyncHandler.js";

export const checkIsAdmin = asyncError(async (req, res, next) => {
    const userId = req.user?.userId;
    const user = await User.findById(userId).lean();
    if (user.email === ADMIN_EMAIL) {
        req.isAdmin = true;
       
    } else {
        req.isAdmin=false;
    }
     return next();
});
