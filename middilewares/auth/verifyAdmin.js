import { ADMIN_EMAIL } from "../../config/server-config.js";
import User from "../../models/User.js";
import AppError from "../../utils/error/AppError.js";
import asyncError from "../errorHand/asyncHandler.js";

export const verifyAdmin = asyncError(async (req, res, next) => {
    const userId = req.user?.userId;

    if (!userId) {
        return next(new AppError("Unauthorized: User ID missing", 401));
    }

    const user = await User.findById(userId);

    if (!user) {
        return next(new AppError("User does not exist", 403));
    }

    if (user.email === ADMIN_EMAIL) {
        req.isAdmin = true;
        return next();
    } else {
        return next(new AppError("Forbidden: Admin access required", 403));
    }
});
