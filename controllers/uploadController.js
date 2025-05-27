
import asyncError from "../middilewares/errorHand/asyncHandler.js";
import { uploadCloudinary } from "../services/uploadcloudinary.js";
import AppError from "../utils/error/AppError.js";
export const uploadImage = asyncError(async (req, res, next) => {
    // console.log("File received for upload:");
    if (!req.file) {
        return next(new AppError("No file uploaded", 400));
    }
    const fileBuffer = req.file.buffer;
    const result = await uploadCloudinary(fileBuffer);
    if (!result || !result.secure_url) {
        return next(new AppError("Image upload failed", 500));
    }
    const imageUrl = result.secure_url;

    if (!imageUrl) {
        return next(new AppError("Image upload failed", 500));
    }
    return res.status(200).json({ success: true, imageUrl });
})